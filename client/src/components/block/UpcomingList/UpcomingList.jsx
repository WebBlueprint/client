import styles from "./UpcomingList.module.css";
import ListData from "./ListData";
const LatestLessons = () => {
  const myListArray = Array(6).fill(null);

  return (
    <div className={styles.cover}>
      <div className={styles.iconwrap}></div>

      <div className={styles.text}>
        <h3> Pro name </h3>
        <span> Details </span>
      </div>
      <button> view details </button>

      <div>
        {" "}
        <br />
        <div>
          <div>
            {myListArray.map((_, index) => (
              <ListData key={index} />
            ))}
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default LatestLessons;
