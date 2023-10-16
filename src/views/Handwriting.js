import { useContext, useEffect, useState } from 'react';
import calculateDrawingAccuracy, { calculateSpiral } from "../data/Shapes";
import Canvas from '../components/Canvas';
import { AuthContext, AlertContext } from '../context/Contexts';
import { updateUser, uploadSketch } from '../firebase/UserFunctions';
import { useNavigate } from 'react-router-dom';
import { calculateCircle, calculateTriangle, calculateSquare } from '../data/Shapes';
import { Typography, Container, Button } from '@mui/material';
import styled from '@emotion/styled';


const SketchBtn = styled(Button) ({
  marginTop:"8px",
  marginLeft:"20px",
  backgroundColor:"#3498db",
  color:"white",
  padding:"10px",
  minWidth:"100px",
  '&:hover': {
    backgroundColor:"#346edb"
  }
});

const BtnContainer = styled(Container) ({
  
  display:"flex",
  justifyContent:"center",
  marginTop:"10px"

})

export default function Handwriting() {

  const [currUser, _setUser] = useContext(AuthContext);           // Currently logged in user
  const [draw, setDraw] = useState(() => undefined);  // Current draw method for canvas
  const [currShape, setShape] = useState(null);       // Current shape to be drawn
  const [currColor, setColor] = useState("#818181");  // Currently chosen color
  const [isDrawing, setIsDrawing] = useState(false);  // Current drawing status
  const [userCoordinates, setUserCoordinates] = useState([]); // Coordinates of user drawing
  const shapeChoice = false;

  // Retrive alerts values and functions from AlertsProvider
  const [
    _isAlertVisible, _alertMsg, _severity, 
    _setAlertVisibility, showAlert
  ] = useContext(AlertContext);

  const navigate = useNavigate();

  // Canvas dimensions (add useState if flexibility is desired later on)
  const cWidth = 600;
  const cHeight = 300;  
  const numBaselinePoints = 160;
  
    /**
   * Pre-calculate all the baseline coordinates for the shapes 
   **/
  const shapeLen = cHeight - 100;
  const [circleCoordinates, setCircleCoordinates] = useState([]);
  const [trianglePoints, setTrianglePoints] = useState([]);
  const [triangleCoordinates, setTriCoordinates] = useState([]);
  const [squareCorner, setSquareCorner] = useState(null);
  const [squareCoordinates, setSquareCoordinates] = useState([]);
  const [spiralCoordinates, setSpiralCoordinates] = useState([]);

  /**
   * Function to draw a set of coordinates. Primarly to be used to draw the shapes.
   */
  const drawShape = (context) => {

    if(context == null) return;

    // clearCanvas(context);

    context.beginPath();

    // Set the appropriate cooridnates for the drawing
    if(currShape === "circle") {
      context.arc(cWidth / 2, cHeight / 2, shapeLen / 2, 0, 2 * Math.PI);
    }
    else if(currShape === "triangle") {
      let [tp1, tp2, tp3] = trianglePoints;
      context.moveTo(tp1.x, tp1.y);
      context.lineTo(tp2.x, tp2.y);
      context.lineTo(tp3.x, tp3.y);
      context.closePath();
    }
    else if(currShape === "square") {
      context.rect(squareCorner.x, squareCorner.y, shapeLen, shapeLen);
    }
    else if(currShape === "spiral") {
      spiralCoordinates.forEach(coord => {
        context.lineTo(coord[0], coord[1]);
      })
    }

    context.strokeStyle = 'black';
    context.lineWidth = 2;
    context.setLineDash([10, 10]); // Set line dash pattern (dotted outline)
    context.lineJoin = "miter"; // Set line join property to "miter" for the outline
    context.stroke();

    context.setLineDash([]); // Reset line dash pattern for user drawing
    context.lineJoin = "round"; // Reset line join property for user drawing

    context.beginPath();
  };

  /**
   * Clears all writing on the respective canvas.
   * 
   * @param {CanvasRenderingContext2D} context - Context for the canvas to be cleared.
   */
  const clearCanvas = (context) => {
    context.clearRect(0, 0, cWidth, cHeight);
    setUserCoordinates([]);

    // Redraw the spiral if we are on default sprial shape choice
    if(!shapeChoice) {
      setShape("spiral");
      setDraw(() => drawShape);
    }
  };

  /**
   * Translates user's mouse movements into drawings on the canvas.
   * 
   * @param {CanvasRenderingContext2D} context - Context for the canvas to be "drawn" on.
   */
  const drawUserSketch = (context, x, y) => {

    if(!isDrawing) return;

    context.lineTo(x, y);

    // Set line properties
    context.strokeStyle = currColor; // Set the stroke color to the user line color
    context.lineWidth = 2;
    context.lineCap = 'round';
    context.setLineDash([]); // Remove line dash pattern
    context.lineJoin = "round"; // Set line join property to "round"

    context.stroke();


  };

  /**
   * Stops the current user sketching path, by starting a new path on the canvas.
   * 
   * @param {CanvasRenderingContext2D} context - Context to the canvas. 
   */
  const stopSketching = (context) => {
    context.beginPath();
  }


  /**
   * Saves mouse movements made on canvas by the user. (To-be drawn on canvas in {drawUserSketch}).
   * 
   * @param {Number} x - X-coordinate 
   * @param {Number} y - Y-Coordinate
   */
  function addUserCoordinate(context, x, y) {
  
    if(isDrawing) {
      setUserCoordinates([...userCoordinates, [x, y]]);
      drawUserSketch(context, x, y);
    }

  }

  /**
   * Calculates difference between shape and user drawing when submit is clicked 
   */
  function calculateAccuracy() {
    
    if(currShape == null) {
      alert("Please choose a shape first!");
      return;
    }

    var acc = 0;

    // Retrieve accuracy from accuracy function 
    if(currShape === "circle")
      acc = calculateDrawingAccuracy(circleCoordinates, userCoordinates);
    else if(currShape === "triangle")
      acc = calculateDrawingAccuracy(triangleCoordinates, userCoordinates);
    else if (currShape === "square")
      acc = calculateDrawingAccuracy(squareCoordinates, userCoordinates);
    else if (currShape === "spiral" || shapeChoice)
      acc = calculateDrawingAccuracy(spiralCoordinates, userCoordinates);



    // Update the current user
    currUser.accuracies.push(acc);
    currUser.trialDay += 1;
      
    // Update user's progress to firebase
    updateUser(currUser);

    // Save the drawing as an image
    const canvas = document.getElementById('sketch');
    const dataUrl = canvas.toDataURL();

    // Save the drawing to Firebase
    canvas.toBlob(async (blob) => {
      await uploadSketch(blob, currUser.uid, currUser.trialDay);
    });

    // Save image locally until image is loaded to firebase
    currUser.attempts = [...currUser.attempts, {
      day: "Day " + currUser.trialDay,
      sketch: <img 
        src={dataUrl} 
        alt={"Day " + currUser.trialDay + " Sketch"} 
        loading='eager'
        width="100%"
        height="100%"/>
    }];


    // Display alert with accuracy for the use before moving on to the next page
    showAlert("info", `Sketch saved. Your error was ${Math.round(acc)}.`);

    // Navigate to graph, so users can check their progress
    navigate("/graph");

  }


  // Only calculate baseline coordinates once 
  useEffect(() => {

    // Get circle coordinates
    setCircleCoordinates(
      calculateCircle(cWidth, cHeight, numBaselinePoints)
    );
  
    // Get triangle coordinates
    let {tp1, tp2, tp3, tCoordinates} = calculateTriangle(cWidth, cHeight, numBaselinePoints);
    setTriCoordinates(tCoordinates);
    setTrianglePoints([tp1, tp2, tp3]);
    
    // Get square coordinates
    let {sp1, sCoordinates} = calculateSquare(cWidth, cHeight, numBaselinePoints);
    setSquareCoordinates(sCoordinates);
    setSquareCorner(sp1);

    // Get Spiral Coordinates
    setSpiralCoordinates(
      calculateSpiral(cWidth, cHeight, numBaselinePoints)
    );

  }, []);

  // Set default shape depending on settings (Shape Choice available)
  useEffect(() => {
      if(!shapeChoice) setShape("spiral");
  }, [spiralCoordinates, shapeChoice])

  // Clear canvas and draw new shape when button is clicked
  useEffect(() => {

    if(currShape != null) {
      console.log("Drawing a " + currShape);
      setDraw(() => drawShape);
    }

  // eslint-disable-next-line
  }, [currShape]);

      /**
   * Start drawing path when user starts to sketch
   */
  useEffect(() => {
    if(!isDrawing)
      setDraw(() => stopSketching);
  }, [isDrawing]);

  return (

    <div className="Handwriting" style={{backgroundColor:"#050633"}}>
      {!currUser ? <div/> :  // Only load page when user is available

        <Container style={{
          height:"100vh",
          display:"flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection:"column",
          width: "auto",
          marginTop: "40px"

        }}>
          <Typography variant='h2' 
              style={{
                color:"orange",
                margin:"15px"
              }}
            >
            Day {currUser.trialDay + 1}
          </Typography>

          <Typography variant='h4'
            style={{
              color:"white",
              margin:"10px"
            }}
          >
            {shapeChoice ? "Choose a shape and trace it.": "Trace the spiral as closely as possible."}
          </Typography>


            <Canvas id="sketch" draw={draw} saveUserCoordinate={addUserCoordinate}  
                width={cWidth} height={cHeight} 
                onMouseDown={() => setIsDrawing(true)}
                onMouseUp={() => setIsDrawing(false)}
                onMouseOut={() => setIsDrawing(false)}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "10px",
                  position: "relative",
                  border:"2px solid black",
                  width: cWidth,
                  height: cHeight,
                  
                }}/>

          <BtnContainer>
              <SketchBtn id="clearButton" onClick={() => setDraw(() => clearCanvas)}>Restart</SketchBtn>
              <SketchBtn id="submitButton" onClick={() => calculateAccuracy()}>Submit</SketchBtn>
          </BtnContainer>
    
          <Container 
            sx={{
              display: shapeChoice ? "block":"none",
              justifyContent:"center",
              marginTop:"10px"
            }}>
              <SketchBtn data-shape="circle" onClick={()=> { setShape("circle") }}>Circle</SketchBtn>
              <SketchBtn data-shape="triangle" onClick={()=> { setShape("triangle") }}>Triangle</SketchBtn>
              <SketchBtn data-shape="square" onClick={()=> { setShape("square") }}>Square</SketchBtn>
              <SketchBtn data-shape="spiral" onClick={()=> { setShape("spiral") }}>Spiral</SketchBtn>
          </Container>

          <BtnContainer>
            <label style={{color:"white",marginRight:"10px"}}>Choose a color to trace with:</label>
            <input type="color" id="colorPicker" className="color-picker" value={currColor} onChange={e => {setColor(e.target.value)}}/>
          </BtnContainer>
  
        </Container>
      
      }

    </div>
      

 
  );

}