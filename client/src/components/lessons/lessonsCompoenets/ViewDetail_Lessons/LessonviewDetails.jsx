import React from "react";
import { useParams } from "react-router-dom";
import UpcomingSide from "./UpcomingSide";
import View from "./View";
import style from "./LessonviewDetails.module.css";
import LessonsHeader from "../../LessonsHeader";

const LessonDetail = () => {
  // Get the lesson ID from the route parameters
  const { id } = useParams("1");

  return (
    <div> 
    <div  className={style.headers} > <LessonsHeader />  </div> 
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
    </div>

  );
};

export default LessonDetail;
