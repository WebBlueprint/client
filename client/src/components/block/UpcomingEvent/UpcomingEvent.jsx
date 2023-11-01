import styles from "./UpcomingEvent.module.css";
import NoneImage from "./None.svg";

const Upcoming = () => {
  return (
    <div className={styles.cover}>
      <div className={styles.iconwrap}>
        <img src={NoneImage} alt="None" className={styles.non} />
      </div>

      <div className={styles.text}>
        <h3> Pro name </h3>
        <span> Pro detail golf course </span>
        <div>
          <span> Date </span> <br />
          <span> Time </span>
        </div>{" "}
        <br />
        <button> view details </button>
      </div>
    </div>
  );
};

export default Upcoming;
