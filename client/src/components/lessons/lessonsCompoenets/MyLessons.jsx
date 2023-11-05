import { useState } from "react";
import MyLesson_GroupLessons from "./MyLesson_GroupLessons";
import MyLessons_PersonalLessons from "./MyLessons_PersonalLessons";
import style from "./MyList.module.css";

export default function MyLessons() {
  const [showMyGroup, setShowMyGroup] = useState(true);
  const [showMyPersonal, setShowMyPersonal] = useState(false);

  const toggleMyProList = () => {
    setShowMyGroup(true);
    setShowMyPersonal(false);
  };

  const toggleMyDrivingRange = () => {
    setShowMyGroup(false);
    setShowMyPersonal(true);
  };

  return (
    <div className={style.cover}>
      <div className={style.tabs}>
        <div
          onClick={toggleMyProList}
          className={showMyGroup ? style.tab1Active : style.tab1}
        >
          GroupLessons
        </div>

        <div
          onClick={toggleMyDrivingRange}
          className={showMyPersonal ? style.tab2Active : style.tab2}
        >
          PersonalLessons
        </div>
      </div>

      <div>
        {showMyGroup && <MyLesson_GroupLessons />}
        {showMyPersonal && <MyLessons_PersonalLessons />}
      </div>
    </div>
  );
}
