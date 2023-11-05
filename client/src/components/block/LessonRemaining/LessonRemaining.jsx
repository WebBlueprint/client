import styles from "./LessonRemaining.module.css";

const LatestLessons = () => {
  return (
    <div className={styles.cover}>
      <div className={styles.iconwrap}></div>

      <div className={styles.text}>
        <h3> Pro name </h3>
        <span> Pro detail golf course </span>
        <div>
          <span> Date </span> <br />
          <span> Time </span>
          <br />
          Reaming 10 Lessons
          <br />
          (5/10)
        </div>{" "}
        <br />
      </div>
      <div>
        <button> view details </button>
      </div>
    </div>
  );
};

export default LatestLessons;
