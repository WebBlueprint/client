import React from "react";
import styles from "./UpcomingSide.module.css";
import MyListArray from "./MyListArray";

const UpcomingSide = ({ proName, details, lessonId }) => {
  const myListArray = Array(6).fill(null);
{console.log(lessonId)}
  return (
    <div>
      <div>
        <div className={styles.cover}>
          <div className={styles.iconwrap}></div>

          <div className={styles.text}>
            <h3>{proName}</h3>
            <span>{details}</span>
          </div>
          <button>View Details</button>

          <div>
            <br />
            <div>
              <div>
                {myListArray.map((_, index) => (
                  <MyListArray key={index} />
                ))} {/* Closing parenthesis for map function */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingSide;
