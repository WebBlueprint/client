import React from "react";
import { useParams } from "react-router-dom";
import Setting from "./lessonsCompoenets/Probox";

const LessonDetail = () => {
  const { id } = useParams();

  const content =
    id === "1" ? (
      <div>
        {" "}
        <Setting />{" "}
      </div>
    ) : (
      <div> 호잇호잇 </div>
    );

  return <div>{content}</div>;
};

export default LessonDetail;
