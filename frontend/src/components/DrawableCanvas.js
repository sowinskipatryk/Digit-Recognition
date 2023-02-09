import React, { useState, useRef, useEffect } from 'react';
import styles from './DrawableCanvas.module.css';

const DrawableCanvas = () => {
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
  }, []);

  return (
    <canvas
      className={styles.canvasBox}
      ref={canvasRef}
    />
  );
};

export default DrawableCanvas;
