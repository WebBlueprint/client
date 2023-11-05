import styles from "./LocationBox.module.css";

const LocationBox = () => {
  return (
    <div>
      <div className={styles.cover}>
        <div className={styles.map}>google map</div>
        <div className={styles.text}>
          <h3> 타이틀 </h3>
          <span>주소 </span>
        </div>
        <button> View Details </button>
      </div>
    </div>
  );
};

export default LocationBox;
