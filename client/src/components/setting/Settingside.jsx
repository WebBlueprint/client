import React, { useState } from "react";
import styles from "./Settingside.module.css";
import { ReactComponent as Menu2Icon } from "../Lessons/menu2.svg";

const Settingside = ({ onTabClick }) => {
  const [activeTab, setActiveTab] = useState("MyProfile");

  const handleTabClick = (tabName) => {
    onTabClick(tabName);
    setActiveTab(tabName);
  };

  return (
    <div className={styles.sideGrid}>
      <div
        className={
          activeTab === "MyProfile"
            ? `${styles.cover1} ${styles.active}`
            : styles.cover1
        }
        onClick={() => handleTabClick("MyProfile")}
      >
        <div>
          <Menu2Icon fill={activeTab === "MyProfile" ? "#1B4607" : "#D9D9D9"} />
        </div>
        <div className={activeTab === "MyProfile" ? styles.activeText : null}>
          My Profile
        </div>
      </div>

      <div
        className={
          activeTab === "UserInfo"
            ? `${styles.cover1} ${styles.active}`
            : styles.cover1
        }
        onClick={() => handleTabClick("UserInfo")}
      >
        <div>
          <Menu2Icon fill={activeTab === "UserInfo" ? "#1B4607" : "#D9D9D9"} />
        </div>
        <div className={activeTab === "UserInfo" ? styles.activeText : null}>
          User Info
        </div>
      </div>

      <div
        className={
          activeTab === "Setting"
            ? `${styles.cover1} ${styles.active}`
            : styles.cover1
        }
        onClick={() => handleTabClick("Setting")}
      >
        <div>
          <Menu2Icon fill={activeTab === "Setting" ? "#1B4607" : "#D9D9D9"} />
        </div>
        <div className={activeTab === "Setting" ? styles.activeText : null}>
          Setting
        </div>
      </div>
    </div>
  );
};

export default Settingside;
