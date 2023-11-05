import styles from "./ReviewLocationData.module.css";

const ReviewLocationData = () => {
  return (
    <div>
      <div className={styles.cover}>
        <div className={styles.img}>pro img</div>
        <div className={styles.text}>
          <h3> Pro name </h3>
          <span> Pro Star </span>
        </div>
        <button className={styles.btnbox}> View Details </button>
      </div>{" "}
    </div>
  );
};

export default ReviewLocationData;
