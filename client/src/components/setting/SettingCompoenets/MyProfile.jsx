import React, { useState } from "react";
import styles from "./MyProfile.module.css";

const MyProfile = () => {
  const tabs = ["Careers", "Curriculum", "Photos", "Golf Range", "Reviews"];
  const [activeTab, setActiveTab] = useState("Careers");
  const [careers, setCareers] = useState("");
  const [curriculum, setCurriculum] = useState("");
  const [photos, setPhotos] = useState("");
  const [golfRange, setGolfRange] = useState("");
  const [reviews, setReviews] = useState("");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className={styles.menu}>
        {tabs.map((tab) => (
          <div
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={
              activeTab === tab ? styles.activeTab : styles.inactiveTab
            }
          >
            {tab}
          </div>
        ))}
      </div>

      <div>
        {activeTab === "Careers" && (
          <input
            type="textbox"
            value={careers}
            onChange={(e) => setCareers(e.target.value)}
            placeholder="Enter your career details here"
          />
        )}

        {activeTab === "Curriculum" && (
          <input
            type="textbox"
            value={curriculum}
            onChange={(e) => setCurriculum(e.target.value)}
            placeholder="Enter your curriculum details here"
          />
        )}

        {activeTab === "Photos" && (
          <input
            type="file"
            // Handle file input change here
          />
        )}

        {activeTab === "Golf Range" && (
          <input
            type="textbox"
            value={golfRange}
            onChange={(e) => setGolfRange(e.target.value)}
            placeholder="Enter your golf range details here"
          />
        )}

        {activeTab === "Reviews" && (
          <input
            type="textbox"
            value={reviews}
            onChange={(e) => setReviews(e.target.value)}
            placeholder="Enter your reviews here"
          />
        )}
      </div>
    </div>
  );
};

export default MyProfile;
