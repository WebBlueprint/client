import React from "react";
import style from "./ViewPro.module.css";

const ViewPro = () => {
  return (
    <div>
      <div className={style.Proinfo}>
        <div className={style.photo}> </div>

        <div className={style.text}>
          <div> My Lessons Review </div>
          <div> with Pro Mr. Yang </div>

          <div>
            {" "}
            Nov. 4 2023 Thu <div> PM 2:00 </div>{" "}
          </div>
        </div>

        <div>
          {" "}
          <button> Chat </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default ViewPro;
