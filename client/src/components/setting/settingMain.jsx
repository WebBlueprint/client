// SettingMain.jsx
import React, { useState } from "react";
import LessonsHeader from "../lessons/LessonsHeader";
import styles from "./SettingMain.module.css";
import Setting from "./SettingCompoenets/Setting";
import MyProfile from "./SettingCompoenets/MyProfile";
import MyUserInfo from "./SettingCompoenets/MyUserInfo";
import Myslot from "./SettingCompoenets/Myslot";

import Settingside from "./Settingside";

const SettingMain = () => {
  const [selectedTab, setSelectedTab] = useState("MyProfile");
  const [isPro, setIsPro] = useState(true);

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  const handleToggleProUser = () => {
    setIsPro((prevIsPro) => !prevIsPro);
  };

  let tabContent = null;

  if (selectedTab === "MyProfile") {
    tabContent = <MyProfile />;
  } else if (selectedTab === "Setting") {
    tabContent = <Setting />;
  } else if (selectedTab === "UserInfo") {
    tabContent = <MyUserInfo />;
  } else if (selectedTab === "myslot") {
    tabContent = <Myslot />;
  }

  return (
    <div className={styles.appsin}>
      <div className={styles.cover}>
        {/* Pass the required props to LessonsHeader */}
        <LessonsHeader isPro={isPro} onToggleProUser={handleToggleProUser} />
        <div className={styles.settingbody}>
          <div className={styles.sidebar}>
          <Settingside onTabClick={handleTabClick} isPro={isPro} />
                    </div>
          <div className={styles.tabContent}>{tabContent}</div>
        </div>
      </div>
    </div>
  );
};

export default SettingMain;
