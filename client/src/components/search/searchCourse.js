import React from "react";
import styles from "./searched.module.css";
import GolfPlaceNear from "./GolfPlaceNear";


const SearchCourse = ({ locationName }) => {
  return (
    <div>
      <div className={styles.course}>
        <GolfPlaceNear/>
      </div>
    </div>
  );
};

export default SearchCourse;