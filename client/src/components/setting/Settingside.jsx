import React, { useState } from "react";
import styles from "./Settingside.module.css";
import { ReactComponent as Info } from "./InfoIcon.svg";
import { ReactComponent as Setting } from "./SettingIcon.svg";
import { ReactComponent as Profileicon } from "./Profileicon.svg";
import { ReactComponent as SlotIcon } from "./SlotIcon.svg";
import { ReactComponent as ListIcon } from "./ListIcon.svg";
import { ReactComponent as Review } from "./Review.svg";

const Settingside = ({ onTabClick, isPro }) => {
  const [activeTab, setActiveTab] = useState("MyProfile");

  const handleTabClick = (tabName) => {
    console.log("Clicked Tab:", tabName);
    onTabClick(tabName);
    setActiveTab(tabName);
  };

  const getTabColor = (tabName) => {
    return activeTab === tabName ? "#1B4607" : "#D9D9D9";
  };

  const handleIconClick = (tabName) => {
    if (activeTab === tabName) {
      setActiveTab("default");
    } else {
      setActiveTab(tabName);
    }
  };

  const getIconFill = (tabName) => {
    return activeTab === tabName ? "#1B4607" : "#D9D9D9";
  };

  return (
    <div className={styles.sideGrid}>
      <div
        className={`${styles.cover1} ${activeTab === "UserInfo" ? styles.active : ""}`}
        onClick={() => handleTabClick("UserInfo")}
        style={{ color: getTabColor("UserInfo") }}
      >
        <div className={styles.iconWrapper} onClick={() => handleIconClick("UserInfo")}>
          <Info fill={getIconFill("UserInfo")} />
        </div>
        <div className={activeTab === "UserInfo" ? styles.activeText : styles.texts}>
          User Info
        </div>
      </div>

      <div
        className={`${styles.cover1} ${activeTab === "Setting" ? styles.active : ""}`}
        onClick={() => handleTabClick("Setting")}
        style={{ color: getTabColor("Setting") }}
      >
        <div className={styles.iconWrapper} onClick={() => handleIconClick("Setting")}>
          <Setting fill={getIconFill("Setting")} />
        </div>
        <div className={activeTab === "Setting" ? styles.activeText : styles.texts}>
          Setting
        </div>
      </div>

      <div
        className={`${styles.cover1} ${activeTab === "mylist" ? styles.active : ""}`}
        onClick={() => handleTabClick("mylist")}
        style={{ color: getTabColor("mylist") }}
      >
        <div className={styles.iconWrapper} onClick={() => handleIconClick("mylist")}>
          <ListIcon fill={getIconFill("mylist")} />
        </div>
        <div className={activeTab === "mylist" ? styles.activeText : styles.texts}>
          My List
        </div>
      </div>

      {isPro && (
        <div className={styles.proFeatures}>
          <div
            className={`${styles.cover1} ${activeTab === "MyProfile" ? styles.active : ""}`}
            onClick={() => handleTabClick("MyProfile")}
            style={{ color: getTabColor("MyProfile") }}
          >
            <div className={styles.iconWrapper} onClick={() => handleIconClick("MyProfile")}>
              <Profileicon fill={getIconFill("MyProfile")} />
            </div>
            <div className={activeTab === "MyProfile" ? styles.activeText : styles.texts}>
              My Profile
            </div>
          </div>

          <div
            className={`${styles.cover1} ${activeTab === "myslot" ? styles.active : ""}`}
            onClick={() => handleTabClick("myslot")}
            style={{ color: getTabColor("myslot") }}
          >
            <div className={styles.iconWrapper} onClick={() => handleIconClick("myslot")}>
              <SlotIcon fill={getIconFill("myslot")} />
            </div>
            <div className={activeTab === "myslot" ? styles.activeText : styles.texts}>
              My Slot
            </div>
          </div>

          <div
            className={`${styles.cover1} ${activeTab === "ProReviewSend" ? styles.active : ""}`}
            onClick={() => handleTabClick("ProReviewSend")}
            style={{ color: getTabColor("ProReviewSend") }}
          >
            <div className={styles.iconWrapper} onClick={() => handleIconClick("ProReviewSend")}>
              <Review fill={getIconFill("ProReviewSend")} />
            </div>
            <div className={activeTab === "ProReviewSend" ? styles.activeText : styles.texts}>
              Lessons Review
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settingside;
