import './App.css';
import Canvas from './components/Canvas';
import Chart from './components/Chart';

function App() {

  const PROBS = [12.2, 7.14, 3.16, 56.3, 0.0, 0.0, 4.3, 9.1, 1.6, 6.2]
  const PRED = 3

  // const draw = (ctx, frameCount) => {
  //   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  //   ctx.fillStyle = '#000000'
  //   ctx.beginPath()
  //   ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
  //   ctx.fill()
  // }
  
  return (
    <div className="App">
      {/* <Canvas draw={draw} /> */}
      <Canvas />
      <Chart probsArray={PROBS} maxProb={PRED} />
    </div>
  );
}

export default App;
