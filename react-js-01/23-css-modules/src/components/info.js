// import './info.css';
import styles from './info.module.css';

console.log(styles);

function Info() {
  return (
    <div className={styles.info}>
      <h1>Hello from the info component</h1>
      <h2>Header H2 Info</h2>
      <button className="my-button">Click me in the info component</button>
      <button className={styles.myOtherButton}>Button with local CSS</button>
    </div>
  );
}

export default Info;
