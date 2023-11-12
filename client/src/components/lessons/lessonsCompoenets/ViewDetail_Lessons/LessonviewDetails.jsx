import React from "react";
import { useParams } from "react-router-dom";
import UpcomingSide from "./UpcomingSide";
import View from "./View";
import style from "./LessonviewDetails.module.css";

const LessonDetail = () => {
  // Get the lesson ID from the route parameters
  const { id } = useParams("1");

  return (
    <div className={style.cover}>
      <div>
        {/* Pass the lesson ID obtained from route parameters to UpcomingSide */}
        <UpcomingSide lessonId={id} />
      </div>
      <div>
        {/* Pass the lesson ID obtained from route parameters to View */}
        <View lessonId={id} />
      </div>
    </div>
  );
};

export default LessonDetail;
