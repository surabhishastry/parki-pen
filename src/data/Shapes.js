
/**
 * Calculates the baseline coordinate for a spiral shape.
 * 
 * @param {Number} cWidth - Width of canvas
 * @param {Number} cHeight - Height of canvas
 * @param {Number} numBaselinePoints - The number of points on the circle to include.
 * 
 * @returns Coordinates on canvas for a spiral.
 */
export function calculateSpiral(cWidth, cHeight, numBaselinePoints) {

    // Center and Radius for a circle
    const endRadius = (cHeight -25) / 2;
    const startRadius = endRadius / 3;
    
    // Calculate the center of the circle
    const centerX = (cWidth / 2), centerY = (cHeight / 2);

    let baselineCoordinates = [];

    let currRadius = startRadius;
    const radiusDelta = (endRadius - startRadius) / numBaselinePoints;

    // Loop through all angle increments and calculate the respective point on the spiral perimeter  
    for (let angle = 0; angle <= 900; angle += (900/numBaselinePoints)) {

        let radians = angle * Math.PI / 180

        // Calculate new coordinate on the circle perimeter
        let x = (Math.cos(radians) * currRadius)  + centerX;
        let y = (Math.sin(radians) * currRadius) + centerY;

        baselineCoordinates.push([x, y]);

        currRadius += radiusDelta;
    }
  
      return baselineCoordinates;


}

/**
 * Calculate the baseline coordinates for a circle shape.
 * 
 * @param {Number} cWidth - Width of canvas
 * @param {Number} cHeight - Height of canvas
 * @param {Number} numBaselinePoints - The number of points on the circle to include.
 * 
 * @returns Coordinates on canvas for a circle
 */
export function calculateCircle(cWidth, cHeight, numBaselinePoints) {
    // Center and Radius for a circle
    const radius = (cHeight - 100) / 2;

    // Calculate the center of the circle
    const centerX = (cWidth / 2), centerY = (cHeight / 2);

    let baselineCoordinates = [];

    // Loop through all angle increments and calculate the respective point on the circle perimeter  
    for (let angle = 0; angle <= 360; angle += (360/numBaselinePoints)) {

      let radians = angle * Math.PI / 180

      // Calculate new coordinate on the circle perimeter
      let x = (Math.cos(radians) * radius)  + centerX;
      let y = (Math.sin(radians) * radius) + centerY;

      baselineCoordinates.push([x, y]);
    }

    return baselineCoordinates;
}

/**
 * Calculates the baseline coordinates for a triangle.
 * 
 * @param {Number} cWidth - Width of canvas.
 * @param {Number} cHeight - Height of canvas.
 * @param {Number} numBaselinePoints - The number of points on the circle to include.
 * @returns - Verticies of a triangle and coordiantes for a triangle on the canvas.
 */
export function calculateTriangle(cWidth, cHeight, numBaselinePoints) {

    let baselineCoordinates = [];

    // Calculate coordinates for the 3 points of the triangle
    let height = cHeight - 100;
    let side = height / Math.cos(30 * Math.PI / 180);
    let width = Math.sin(30 * Math.PI / 180) * side;
    
    let tp1 = {
        x: cWidth / 2,
        y: 50
    };

    let tp2 = {
        x: tp1.x - width,
        y: tp1.y + height
    };

    let tp3 = {
        x: tp1.x + width,
        y: tp1.y + height
    };

    // --> Calculate baseline coordinates for the triangle
    baselineCoordinates = [];

    // Calculate individual coordinates on the triangle
    for(let len = 0; len <= side; len += side / (numBaselinePoints / 3)) {

      let xLeft = tp1.x - (Math.sin(30 * Math.PI / 180) * len); // First Side
      let xRight = tp1.x + (Math.sin(30 * Math.PI / 180) * len); // Second Side
      let y = tp1.y + (Math.cos(30 * Math.PI / 180) * len);

      baselineCoordinates.push([xLeft, y]);
      baselineCoordinates.push([xRight, y]);

      // Third Side
      let x = tp2.x + len;
      baselineCoordinates.push([x, tp2.y]);
    }       

    return {tp1, tp2, tp3, tCoordinates: baselineCoordinates};

}

/**
 * Calculates the baseline coordinates for a square.
 *  
 * @param {Number} cWidth - Width of canvas
 * @param {Number} cHeight - Height of canvas
 * @param {Number} numBaselinePoints - The number of points on the circle to include.
 * @returns - Top left corner of the square and coordinates for the square on canvas.77
 */
export function calculateSquare(cWidth, cHeight, numBaselinePoints) {
   
    // Cacluate the side length and top left coordinate of the square
    let squareLen = cHeight - 100;

    let sp1 = {
        x: (cWidth / 2) - (squareLen / 2),
        y: 50
    };

    // --> Calculate baseline coordinates for the Square shape
    let baselineCoordinates = [];

    // Calculate the individual coordinates on the perimeter of the square
    for(let len = 0; len <= squareLen; len += squareLen / (numBaselinePoints / 4)) {

        // Top Side
        baselineCoordinates.push([sp1.x + len, sp1.y]);

        // Left Side
        baselineCoordinates.push([sp1.x, sp1.y + len]);

        // Right Side;
        baselineCoordinates.push([sp1.x + squareLen, sp1.y + len]);

        // Bottom Side
        baselineCoordinates.push([sp1.x + len, sp1.y + squareLen]);

    }
    
    return {sp1, sCoordinates: baselineCoordinates};

}


/**
 * Calculates the difference between baseline coordinates and
 * user drawn coordinates using euclidan distance.
 * 
 * @param {[Number]} baselineCoordinates - Set of coordinates representing shape on canvas.
 * @param {[Number]} userCoordinates - Set of coordinates representing the user drawn shape on canvas.
 * @returns - Average distance between baselineCoordinates and userCoordiantes (Average Error). 
 */
export default function calculateDrawingAccuracy(baselineCoordinates, userCoordinates) {

    // Ensure enough coordinates are inputted
    if (userCoordinates.length === 0) {
        console.error('User coordinates are required.');
        return;
    }

    if (baselineCoordinates.length === 0) {
        console.error('Baseline coordinates are required.');
        return;
    }

    // Find the smallest distance to any baseline coordinate for every user drawn coordinate.
    let sumDiff = 0;
    userCoordinates.forEach(userCoord => {

        let minDist = Number.MAX_SAFE_INTEGER;
        baselineCoordinates.forEach(baseCoord => {

            const diffX = baseCoord[0] - userCoord[0];
            const diffY = baseCoord[1] - userCoord[1];

            const euclideanDistance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
            minDist = Math.min(minDist, euclideanDistance);
        });

        sumDiff += minDist;

    });

    // Average error -- average error in pixels
    let avg_error = sumDiff / userCoordinates.length;

    return avg_error;

}
