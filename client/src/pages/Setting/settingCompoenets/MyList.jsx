import React, { useState } from "react";
import MyProList from "./MyList_MyProList";
import MyDrivingRange from "./MyList_MyDrivingRange";
import style from "./MyList.module.css";

export default function MyList() {
    const [showMyProList, setShowMyProList] = useState(true); // 초기에 My Pro List를 보이게 설정
    const [showMyDrivingRange, setShowMyDrivingRange] = useState(false);

    const toggleMyProList = () => {
        setShowMyProList(!showMyProList);
        setShowMyDrivingRange(false); // My Pro List를 클릭하면 My Driving Range를 숨깁니다.
    };

    const toggleMyDrivingRange = () => {
        setShowMyDrivingRange(!showMyDrivingRange);
        setShowMyProList(false); // My Driving Range를 클릭하면 My Pro List를 숨깁니다.
    };

    return (
        <div className={style.cover}>
            <h2 className={style.title}> My List </h2>
            <div className={style.tabs}>
                <div onClick={toggleMyProList} className={style.tab1}>
                    My Pro List
                </div>

                <div onClick={toggleMyDrivingRange} className={style.tab2}>
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
