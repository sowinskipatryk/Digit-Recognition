import './App.css';
import DrawableCanvas from './components/DrawableCanvas';
import Chart from './components/Chart';

function App() {

  const PROBS = [12.2, 7.14, 3.16, 56.3, 0.0, 0.0, 4.3, 9.1, 1.6, 6.2]
  const PRED = 3
  
  return (
    <div className="App">
      <DrawableCanvas />
      <Chart probsArray={PROBS} maxProb={PRED} />
    </div>
  );
}

export default App;
