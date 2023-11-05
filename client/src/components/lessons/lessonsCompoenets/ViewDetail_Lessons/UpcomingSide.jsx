import React from "react";
import styles from "./UpcomingSide.module.css";
import MyListArray from "./MyListArray";
const UpcomingSide = () => {
  const myListArray = Array(6).fill(null);

  return (
    <div>
      <div>
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
                  <MyListArray key={index} />
                ))}
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingSide;
