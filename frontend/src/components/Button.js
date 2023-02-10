import styles from './Button.module.css';

function Button(props) {
  
    const {textBtn} = props.text

    return <button type="button" className={styles.button}>{textBtn}</button>
  }
  
  export default Button;