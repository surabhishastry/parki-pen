import { useRef, useEffect } from "react"

// Component for an HTML canvas that allows for users to draw
export default function Canvas(props) {

    const {draw, saveUserCoordinate, ...canvasProps} = props;
    const canvasRef = useRef(null);

    useEffect(() => {

        // Retrieve the canvas context
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Re-draw the canvas
        if(draw != null) 
            draw(context);
            
        
    }, [draw]);

    // Saves a drawing on the canvas by the user
    const logMouseMove = (e) => {        
        // Retrieve the canvas context
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        let rect = canvas.getBoundingClientRect();

        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        saveUserCoordinate(context, x, y);
    }

    return <canvas ref={canvasRef} onMouseMove={(event) => logMouseMove(event)} {...canvasProps} />;

} 