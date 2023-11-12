import React, { useState } from "react";
import LessonsHeader from "../lessons/LessonsHeader";
import styles from "./SettingMain.module.css";
import Setting from "./SettingCompoenets/Setting";
import MyProfile from "./SettingCompoenets/MyProfile";
import MyUserInfo from "./SettingCompoenets/MyUserInfo";
import Settingside from "./Settingside";

const SettingMain = () => {
  const [selectedTab, setSelectedTab] = useState("MyProfile");

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  let tabContent = null;

  if (selectedTab === "MyProfile") {
    tabContent = <MyProfile />;
  } else if (selectedTab === "Setting") {
    tabContent = <Setting />;
  } else if (selectedTab === "UserInfo") {
    tabContent = <MyUserInfo />;
  }

  return (
    <div className={styles.appsin}>
      <div className={styles.cover}>
        <LessonsHeader />
        <div className={styles.settingbody}>
          <div className={styles.sidebar}>
            <Settingside onTabClick={handleTabClick} />
          </div>
          <div className={styles.tabContent}>{tabContent}</div>
        </div>
      </div>
    </div>
  );
};

export default SettingMain;
