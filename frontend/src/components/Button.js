import styles from './Button.module.css';

const Button = (props) => {
  
    const textBtn = props.txt

    return <button type="button" className={styles.button} onClick={props.onClick}>{textBtn}</button>
  }
  
  export default Button;