import React from "react";
import UpcomingSide from "./UpcomingSide";
import View from "./View";
import style from "./LessonviewDetails.module.css";

const LessonDetail = () => {
  return (
    <div className={style.cover}>
      <div>
        {" "}
        <UpcomingSide />{" "}
      </div>
      <div>
        {" "}
        <View />{" "}
      </div>
    </div>
  );
};

export default LessonDetail;
