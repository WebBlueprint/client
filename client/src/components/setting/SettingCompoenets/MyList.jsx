import { useState } from "react";
import MyProList from "./MyList_MyProList";
import MyDrivingRange from "./MyList_MyDrivingRange";
import style from "./MyList.module.css";

export default function MyList() {
  const [showMyProList, setShowMyProList] = useState(true);
  const [showMyDrivingRange, setShowMyDrivingRange] = useState(false);

  const toggleMyProList = () => {
    setShowMyProList(true);
    setShowMyDrivingRange(false);
  };

  const toggleMyDrivingRange = () => {
    setShowMyProList(false);
    setShowMyDrivingRange(true);
  };

  return (
    <div className={style.cover}>
      <div className={style.tabs}>
        <div
          onClick={toggleMyProList}
          className={showMyProList ? style.tab1Active : style.tab1}
        >
          My Pro List
        </div>

        <div
          onClick={toggleMyDrivingRange}
          className={showMyDrivingRange ? style.tab2Active : style.tab2}
        >
          My DrivingRange
        </div>
      </div>

      <div>
        {showMyProList && <MyProList />}
        {showMyDrivingRange && <MyDrivingRange />}
      </div>
    </div>
  );
}
