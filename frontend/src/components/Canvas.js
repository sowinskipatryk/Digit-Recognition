import React from 'react';
import styles from './Canvas.module.css';
import useCanvas from './useCanvas';

const _predraw = (context) => {
  const { width, height } = context.canvas
  context.clearRect(0, 0, width, height)
}

const _postdraw = (context) => {
  console.log('drawing finished')
 }

const Canvas = props => {  

  const { draw, predraw=_predraw, postdraw=_postdraw } = props
  const canvasRef = useCanvas(draw, {predraw, postdraw})
  
  return <canvas className={styles.canvas} ref={canvasRef} />
}

export default Canvas;