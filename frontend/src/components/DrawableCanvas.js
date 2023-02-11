import React, { useRef, useEffect, useState } from 'react';
// import { useDebouncedCallback } from 'debounce';
import debounce from 'lodash.debounce';
import styles from './DrawableCanvas.module.css';
import Button from './Button';
import Box from './Box';

const DrawableCanvas = (props) => {
  const updateData = props.onPredict;
  const canvasRef = useRef(null);
  const prevPos = useRef({ offsetX: 0, offsetY: 0 });
  const [debouncedFetchData, setDebouncedFetchData] = useState(null);
  // let canvas;

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // const sendRequest = useCallback(() => {
  //   fetch('http://127.0.0.1:8000/recognize/', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       image: canvas.toDataURL("image/jpeg", 0.5)
  //     })
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       updateData(data.probs, data.pred);
  //     });
  // }, [updateData, canvas]);

  // const [debouncedUpdateData] = useDebouncedCallback(() => {
  //   fetch('http://127.0.0.1:8000/recognize/', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         image: canvas.toDataURL("image/jpg")
  //       })
  //     })
  //     .then(response => response.json())
  //     .then(data => {
  //       updateData(data.probs, data.pred);
  //     })
  // }, 500);

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
    if (!debouncedFetchData) {
      setDebouncedFetchData(debounce(fetchData, 500));
    }
  }, []);

  useEffect(() => {
    // let timeoutId;
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

    // canvas.addEventListener('mouseup', (e) => {
    //   console.log('REQUEST SENT');

    //   fetch('http://127.0.0.1:8000/recognize/', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         image: canvas.toDataURL("image/jpg")
    //       })
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //       updateData(data.probs, data.pred);
    //     })
    // });

    canvas.addEventListener('mouseup', (e) => {
      console.log('REQUEST SENT');
      debouncedFetchData();
    });

    // canvas.addEventListener('mouseup', (e) => {
    //   clearTimeout(timeoutId);
    //   timeoutId = setTimeout(() => {
    //     sendRequest();
    //   }, 500);
    // });

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
  }, [debouncedFetchData]);

  return (
    <Box>
      <canvas
        className={styles.canvasBox}
        ref={canvasRef}
      />
      <Button txt="Clear canvas" onClick={clearCanvas} />
    </Box>
  );
};

export default DrawableCanvas;
