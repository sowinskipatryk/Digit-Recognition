import React, { useState } from 'react';
import './App.css';
import DrawableCanvas from './components/DrawableCanvas';
import Chart from './components/Chart';
import Text from './components/UI/Text';

function App() {
  
  const [probs, setProbs] = useState(Array.from({length: 10}, () => 50))
  const [pred, setPred] = useState(-1)

  const updateChart = ((newProbs, newPred) => {
    setProbs(newProbs);
    setPred(newPred);
  });

  const predictInfo = pred !== -1 ? `Written digit recognized as ${pred} with ${probs[pred].toFixed(2)}% confidence` : ""

  return (
    <div className="App">
      <Text className="title" txt="Digit Recognition Tool" />
      <DrawableCanvas onPredict={updateChart} />
      <Chart probsArray={probs} maxProb={pred} />
      <Text className="predInfoText" txt={ predictInfo } />
    </div>
  );
}

export default App;
