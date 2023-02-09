import React from "react";
import styles from './ChartBar.module.css';

const ChartBar = (props) => {
  let barFillHeight = props.value + "%";

  return (
    <div className={styles.chartBar}>
      <div className={styles.chartBarInner}>
        <div className={props.maxProbFlag ? `${styles.chartBarFill} ${styles.chartBarFillMax}`: styles.chartBarFill} style={{ height: barFillHeight }}></div>
      </div>
      <div className={props.maxProbFlag ? `${styles.chartBarLabel} ${styles.chartBarLabelMax}`: styles.chartBarLabel}>{props.label}</div>
    </div>
  );
};

export default ChartBar;
