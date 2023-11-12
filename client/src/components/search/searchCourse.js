import React from "react";
import ReviewLocation from "./ReviewLocation";
import styles from "./searched.module.css";

const SearchCourse = () => {
  return (
    <div>
      <div className={styles.course}>
        <ReviewLocation />
      </div>
    </div>
  );
};

export default SearchCourse;
