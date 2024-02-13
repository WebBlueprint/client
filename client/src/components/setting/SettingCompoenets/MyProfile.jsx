import React, { useState, useRef } from "react";
import styles from "./MyProfile.module.css";
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

const MyProfile = () => {
  const tabs = ["Careers", "Curriculum", "Photos", "Golf Range", "Reviews"];
  const [activeTab, setActiveTab] = useState("Careers");
  const [careersContent, setCareersContent] = useState("");
  const [curriculumContent, setCurriculumContent] = useState("");
  const [photosContent, setPhotosContent] = useState("");
  const [golfRangeContent, setGolfRangeContent] = useState("");
  const [reviewsContent, setReviewsContent] = useState("");

  const editorRef = useRef();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (content) => {
    switch (activeTab) {
      case "Careers":
        setCareersContent(content);
        break;
      case "Curriculum":
        setCurriculumContent(content);
        break;
      case "Photos":
        setPhotosContent(content);
        break;
      case "Golf Range":
        setGolfRangeContent(content);
        break;
      case "Reviews":
        setReviewsContent(content);
        break;
      default:
        break;
    }
  };

  const handleSave = () => {
    // 현재 활성화된 탭에 해당하는 내용 가져오기
    let contentToSave = "";
    switch (activeTab) {
      case "Careers":
        contentToSave = careersContent;
        break;
      case "Curriculum":
        contentToSave = curriculumContent;
        break;
      case "Photos":
        contentToSave = photosContent;
        break;
      case "Golf Range":
        contentToSave = golfRangeContent;
        break;
      case "Reviews":
        contentToSave = reviewsContent;
        break;
      default:
        break;
    }
    
    // 이후 해당 내용을 서버로 전송하거나 다른 곳에 저장하는 로직을 추가하세요
    console.log(`Saving content for ${activeTab}: ${contentToSave}`);
  };

  const sendDataToServer = (data) => {
    // Code to send data to server
    console.log(`Sending data to server: ${data}`);
    // 여기에 실제 서버로 데이터를 보내는 로직을 추가하세요.
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
        {activeTab !== "Photos" && (
          <Editor
            initialValue={
              activeTab === "Careers" ? careersContent :
              activeTab === "Curriculum" ? curriculumContent :
              activeTab === "Golf Range" ? golfRangeContent :
              activeTab === "Reviews" ? reviewsContent :
              ""
            }
            height="500px"
            previewStyle="vertical"
            initialEditType="markdown"
            ref={editorRef}
            onChange={handleInputChange}
          />
        )}

        {activeTab === "Photos" && (
          <input
            type="file"
          />
        )}

        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default MyProfile;
