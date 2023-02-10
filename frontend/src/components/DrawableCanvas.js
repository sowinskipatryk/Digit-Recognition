import React, { useRef, useEffect } from 'react';
import styles from './DrawableCanvas.module.css';
import Button from './Button';

const DrawableCanvas = (props) => {
  const updateData = props.onPredict;
  const canvasRef = useRef(null);
  const prevPos = useRef({ offsetX: 0, offsetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.canvas.width = "432";
    ctx.canvas.height = "432";

    canvas.addEventListener('mousedown', (e) => {
      console.log('Started Drawing');
      prevPos.current = { offsetX: e.offsetX, offsetY: e.offsetY };
    });

    canvas.addEventListener('mouseup', (e) => {
      console.log('Stopped Drawing');

      fetch('http://127.0.0.1:8000/recognize/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            image: canvas.toDataURL("image/jpg")
          })
        })
        .then(response => response.json())
        .then(data => {
          updateData(data.probs, data.pred);
        })
        .then(() => {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
        });
    });

    canvas.addEventListener('mousemove', (e) => {
      if (e.buttons !== 1) return;
      
      ctx.beginPath();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.moveTo(prevPos.current.offsetX, prevPos.current.offsetY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();

      prevPos.current = { offsetX: e.offsetX, offsetY: e.offsetY };
    });
  }, [updateData]);

  return (
    <div>
    <canvas
      className={styles.canvasBox}
      ref={canvasRef}
    />
    <Button text="Clear canvas" context={ctx} canva={canvas} />
    </div>
  );
};

export default DrawableCanvas;
