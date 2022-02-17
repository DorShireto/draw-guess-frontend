import React, { useEffect, useRef, useState } from 'react'

const Canvas = ({ props }) => {
    const [canvasTopOffSet, setCanvasTopOffSet] = useState('');
    const [canvasLeftOffSet, setCanvasLeftOffSet] = useState('');
    // var canvasTopOffSet = 0;
    // var canvasLeftOffSet = 0;
    const parentCanvasRef = useRef(null);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const canDraw = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false);
    const { width, height, allowDrawing } = props;
    canDraw.current = allowDrawing;
    useEffect(() => {
        console.log(canDraw)
        const canvas = canvasRef.current;
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = `${width}px`; // need to be in vh / rem
        canvas.style.height = `${height}px`; // need to be in vh / rem
        const context = canvas.getContext("2d");
        context.scale(1, 1);
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 3;
        context.fillStyle = "white";
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)
        contextRef.current = context;
    }, [document.getElementById('canvas')])

    // Web drawing handles
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
        parentCanvasRef.current = contextRef.current;
        setIsDrawing(false)
    }

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
            return
        }
        const { offsetX, offsetY } = nativeEvent;
        // console.log("Drawing with mouse offsetX:", offsetX, " offsetY: ", offsetY);
        contextRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke()
    }

    // Mobile drawing handles
    const startDrawingMobile = ({ changedTouches }) => {
        let c = contextRef;
        console.log(c)
        // // let a = canvasRef.current.canvas.offsetTop;
        // // let b = canvasRef.current.canvas.offsetLeft;
        // // setCanvasTopOffSet(canvasRef.current.canvas.offsetTop);
        // // setCanvasLeftOffSet(canvasRef.current.canvas.offsetLeft);
        // console.log("canvasLeftOffSet: ", canvasLeftOffSet);
        // console.log("canvasTopOffSet: ", canvasTopOffSet);
        setCanvasTopOffSet(contextRef.current.canvas.offsetTop);

        console.log("Touchscreen Start in canvas: ", changedTouches);
        const { pageX, pageY } = changedTouches[0]
        console.log("In Start drawing mobile pageX:", pageX, " pageY: ", pageY);
        const { clientX, clientY } = changedTouches[0];
        console.log("In Start drawing mobile clientX: ", clientX, " clientY: ", clientY);
        contextRef.current.beginPath()
        contextRef.current.moveTo(pageX, pageY - canvasTopOffSet)
        // contextRef.current.moveTo(pageX, pageY)
        // contextRef.current.closePath()
        setIsDrawing(true)
    }

    const drawMobile = ({ changedTouches }) => {
        if (!isDrawing) {
            return
        }
        // contextRef.current.beginPath()
        // console.log("Touchscreen move in canvas: ", changedTouches);
        const { pageX, pageY } = changedTouches[0];
        console.log("In draw mobile pageX:", pageX, " pageY: ", pageY);
        console.log("Page Y - offSetTop", pageY - canvasTopOffSet)
        console.log("Page X - offSetLeft", pageX - canvasLeftOffSet);
        const { clientX, clientY } = changedTouches[0];
        console.log("In draw mobile clientX: ", clientX, " clientY: ", clientY);
        // contextRef.current.lineTo(pageX - canvasLeftOffSet, pageY - canvasTopOffSet)
        contextRef.current.lineTo(pageX, pageY - canvasTopOffSet)
        contextRef.current.stroke()
        // contextRef.current.closePath()

    }

    if (canDraw.current) {
        return (
            <canvas id="canvas" className='vh-100 outline'
                onMouseDown={startDrawing}
                onTouchStart={startDrawingMobile} // for touchscreen
                onMouseUp={finishDrawing}
                onTouchEnd={finishDrawing} // for touchscreen
                onMouseMove={draw}
                onTouchMove={drawMobile} // for touchscreen
                ref={canvasRef}
                ref2={parentCanvasRef}
            />
        )
    }
    else {
        return (
            <canvas id="canvas" className='vh-100 outline'
                ref={canvasRef}
                ref2={parentCanvasRef}
            />
        )
    }

}

export default Canvas