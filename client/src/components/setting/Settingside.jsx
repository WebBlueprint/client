// Settingside.jsx
import React, { useState } from "react";
import styles from "./Settingside.module.css";
import { ReactComponent as Info } from "./InfoIcon.svg";
import { ReactComponent as Setting } from "./SettingIcon.svg";
import { ReactComponent as Profileicon } from "./Profileicon.svg";
import { ReactComponent as SlotIcon } from "./SlotIcon.svg";

const Settingside = ({ onTabClick, isPro }) => {
  const [activeTab, setActiveTab] = useState("MyProfile");

  const handleTabClick = (tabName) => {
    console.log("Clicked Tab:", tabName);
    onTabClick(tabName);
    setActiveTab(tabName);
  };

  return (
    <div className={styles.sideGrid}>
      <div
        className={`${styles.cover1} ${activeTab === "UserInfo" ? styles.active : ""}`}
        onClick={() => handleTabClick("UserInfo")} // Fixed: Use handleTabClick instead of onTabClick
      >
        <div>
          <Info fill={activeTab === "UserInfo" ? "#1B4607" : "#D9D9D9"} />
        </div>
        <div className={activeTab === "UserInfo" ? styles.activeText : styles.texts}>
          User Info
        </div>
      </div>

      <div
        className={`${styles.cover1} ${activeTab === "Setting" ? styles.active : ""}`}
        onClick={() => handleTabClick("Setting")} // Fixed: Use handleTabClick instead of onTabClick
      >
        <div>
          <Setting fill={activeTab === "Setting" ? "#1B4607" : "#D9D9D9"} />
        </div>
        <div className={activeTab === "Setting" ? styles.activeText : styles.texts}>
          Setting
        </div>
      </div>

      {isPro && (
        <div className={styles.proFeatures}>
          <div
            className={`${styles.cover1} ${activeTab === "MyProfile" ? styles.active : ""}`}
            onClick={() => handleTabClick("MyProfile")} // Fixed: Use handleTabClick instead of onTabClick
          >
            <div>
              <Profileicon fill={activeTab === "MyProfile" ? "#1B4607" : "#D9D9D9"} />
            </div>
            <div className={activeTab === "MyProfile" ? styles.activeText : styles.texts}>
              My Profile
            </div>
          </div>

          <div
            className={`${styles.cover1} ${activeTab === "myslot" ? styles.active : ""}`}
            onClick={() => handleTabClick("myslot")} // Fixed: Use handleTabClick instead of onTabClick
          >
            <div>
              <SlotIcon fill={activeTab === "myslot" ? "#1B4607" : "#D9D9D9"} />
            </div>
            <div className={activeTab === "myslot" ? styles.activeText : styles.texts}>
              My Slot
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settingside;
