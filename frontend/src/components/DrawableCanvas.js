import React, { useRef, useEffect } from 'react';
import styles from './DrawableCanvas.module.css';
import Button from './UI/Button';

const DrawableCanvas = (props) => {
  const updateData = props.onPredict;
  const canvasRef = useRef(null);
  const prevPos = useRef({ offsetX: 0, offsetY: 0 });

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateData(Array.from({length: 10}, () => 50), -1)
  };

  const fetchData = () => {
    fetch('http://127.0.0.1:8000/recognize/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image: canvasRef.current.toDataURL("image/jpg")
        })
      })
      .then(response => response.json())
      .then(data => {
        updateData(data.probs, data.pred);
      })
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.canvas.width = "432";
    ctx.canvas.height = "432";
    ctx.strokeStyle = "#2e1680";
    ctx.fillStyle = "#2e1680";

    canvas.addEventListener('mousedown', (e) => {
      console.log('Started Drawing');
      prevPos.current = { offsetX: e.offsetX, offsetY: e.offsetY };
    });

    canvas.addEventListener('mouseup', (e) => {
      console.log('Stopped Drawing');
      fetchData();
      console.log('REQUEST SENT')
    });

    canvas.addEventListener('mousemove', (e) => {
      if (e.buttons !== 1) return;
      
      ctx.beginPath();
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.moveTo(prevPos.current.offsetX, prevPos.current.offsetY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();

      prevPos.current = { offsetX: e.offsetX, offsetY: e.offsetY };
    });
  }, []);

  return (
    <div>
      <canvas
        className={styles.canvasBox}
        ref={canvasRef}
      />
      <Button className={styles.clearButton} txt="Clear canvas" onClick={clearCanvas} />
    </div>
  );
};

export default DrawableCanvas;
