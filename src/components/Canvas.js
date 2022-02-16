import React, { useEffect, useRef, useState } from 'react'

const Canvas = ({ props }) => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const { width, height } = props;
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = `${width}px`; // need to be in vh / rem
        canvas.style.height = `${height}px`; // need to be in vh / rem
        const context = canvas.getContext("2d");
        context.scale(1, 1);
        context.fillStyle = "white";
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 2;
        contextRef.current = context;
    }, [])

    //
    const startDrawing = ({ nativeEvent }) => {
        console.log("Mouse click down in canvas: ", nativeEvent);
        const { offsetX, offsetY } = nativeEvent;
        console.log("Starting to draw from offsetX:", offsetX, " offsetY: ", offsetY);
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
        setIsDrawing(true)
    }

    const finishDrawing = () => {
        contextRef.current.closePath()
        setIsDrawing(false)
    }

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
            return
        }
        const { offsetX, offsetY } = nativeEvent;
        console.log("Drawing offsetX:", offsetX, " offsetY: ", offsetY);
        contextRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke()
    }

    const startDrawingMobile = ({ changedTouches }) => {
        console.log("Touch down in canvas: ", changedTouches);
        const { pageX, pageY } = changedTouches[0]
        console.log("Starting to draw from pageX:", pageX, " pageY: ", pageY);
        contextRef.current.beginPath()
        contextRef.current.moveTo(pageX, pageY)
        setIsDrawing(true)
    }

    const drawMobile = ({ changedTouches }) => {
        if (!isDrawing) {
            return
        }
        const { pageX, pageY } = changedTouches[0];
        console.log("Drawing pageX:", pageX, " pageY: ", pageY);
        contextRef.current.lineTo(pageX, pageY)
        contextRef.current.stroke()
    }

    return (
        <canvas className='vh-100 outline ph2'
            onMouseDown={startDrawing}
            onTouchStart={startDrawingMobile} // for touchscreen
            onMouseUp={finishDrawing}
            onTouchEnd={finishDrawing} // for touchscreen
            onMouseMove={draw}
            onTouchMove={drawMobile} // for touchscreen
            ref={canvasRef}
        />
    )
}

export default Canvas