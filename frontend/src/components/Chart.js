import React from "react";
import ChartBar from "./ChartBar";
import styles from './Chart.module.css';

const Chart = (props) => {
  const probsArray = props.probsArray;
  const probMax = props.maxProb;

  return (
    <div className={styles.chart}>
      {probsArray.map((prob, index) => (
        <ChartBar
          key={index}
          value={prob}
          label={index}
          maxProbFlag={probMax === index ? true : false}
        />
      ))}
    </div>
  );
};

export default Chart;
