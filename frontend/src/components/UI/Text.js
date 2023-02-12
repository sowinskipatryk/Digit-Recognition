import styles from './Text.module.css';

const Text = props => {
    return <div className={`${props.className} ${styles.text}`}>{props.txt}</div>;
}

export default Text;