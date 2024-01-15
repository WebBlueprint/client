// SearchCourse 컴포넌트
import React from "react";
import ReviewLocation from "./ReviewLocation";
import styles from "./searched.module.css";

const SearchCourse = ({ locationName }) => {
  return (
    <div>
      <div className={styles.course}>
        <ReviewLocation locationName={locationName} />
      </div>
    </div>
  );
};

export default SearchCourse;
