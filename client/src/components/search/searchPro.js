import React from "react";
import Probox from "../lessons/lessonsCompoenets/Probox";
import styles from "./searched.module.css";

const searchPro = () => {
  return (
    <div className={styles.proboxContainer}>
      <Probox />
    </div>
  );
};

export default searchPro;
