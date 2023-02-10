import React, { useState } from 'react';
import './App.css';
import DrawableCanvas from './components/DrawableCanvas';
import Chart from './components/Chart';

function App() {
  
  const [probs, setProbs] = useState(Array.from({length: 10}, () => 50))
  const [pred, setPred] = useState(-1)

  const updateChart = ((newProbs, newPred) => {
    setProbs(newProbs);
    setPred(newPred);
  });

  return (
    <div className="App">
      <DrawableCanvas onPredict={updateChart} />
      <Chart probsArray={probs} maxProb={pred} />
    </div>
  );
}

export default App;
