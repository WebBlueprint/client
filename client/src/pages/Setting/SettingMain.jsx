import "./styles.css";
import Side from "./Side";
import SettingHeader from "./SettingHeader";
import MyList from "./MyList";
import MyLessons from "./MyLessons";

import React, { useState } from "react";

export default function SettingMain() {
    const [selectedTab, setSelectedTab] = useState("myList"); // 초기 탭 설정

    const handleTabClick = (tabName) => {
        setSelectedTab(tabName);
    };

    return (
        <div className="App">
            <div>
                <SettingHeader />
            </div>
            <div className="settingbody">
                <div>
                    <Side onTabClick={handleTabClick} />
                </div>
                <div>
                    {selectedTab === "myList" && <MyList />}
                    {selectedTab === "myLessons" && <MyLessons />}
                </div>
            </div>
        </div>
    );
}
