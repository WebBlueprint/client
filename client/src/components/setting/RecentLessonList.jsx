import React, { useState } from "react";
import styled from "styled-components";
import styles from "./RecentLessonList.module.css";
import { ReactComponent as Play } from "./Play.svg";
import { ReactComponent as PlayBack } from "./Playback.svg";

// Styled components for modal
const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  background-color: #ccc;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TextWrap = styled.div`
  color: black;
`;

const SearchBox = styled.input`
  padding: 10px;
  font-size: 16px;
  width: 100%;
`;

const FilePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FilePreviewItem = styled.div`
  position: relative;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #fff;
  border: none;
  cursor: pointer;
`;

const BtnBox = styled.div`
  text-align: center;
  margin-top: 20px;
`;

// Function to handle file upload
const handleFileUpload = (e, setFiles) => {
  const files = e.target.files;
  setFiles((prevFiles) => [...prevFiles, ...files]);
};

// Function to handle file deletion
const handleDeleteFile = (index, setFiles) => {
  setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
};

const handleClear = (setVideoFiles, setPhotoFiles) => {
  setVideoFiles([]); // Clear video files
  setPhotoFiles([]); // Clear photo files
};

// Modal component
const Modal = ({ lesson, activeTab, onClose, setVideoFiles, setPhotoFiles, videoFiles, photoFiles }) => {
  return (
    <StyledModal>
      <ModalContent>
        {activeTab === "detail" && (
          <div  className={styles.lessonshorts}  >
            <p>{`Customer`}  <SearchBox value={` ${lesson.customerName}`} readOnly /> </p>
            <p>{`Golf Course`} <SearchBox value={` ${lesson.golfCourseLocation}`} readOnly />  </p>
            <div className={styles.textgrid}> 
            <p>{`Date`} <SearchBox value={` ${lesson.date}`} readOnly /> </p>
            <p>{`Time`}  <SearchBox value={` ${lesson.time}`} readOnly /> </p> 
            </div>
            <p>{`Lesson Note`}  <SearchBox value={` 리뷰 코멘트가 들어갑니다 `} readOnly /> </p> 
            <BtnBox>
            <button className={styles.btns} onClick={onClose}>Close</button>
            </BtnBox>
          </div>
        )}
        {activeTab === "review" && (
          <div>
            <Container>
              <TextWrap>Customer</TextWrap>
              <SearchBox value={` ${lesson.customerName}`} readOnly />
            </Container>
            <Container>
              <TextWrap>Select Lessons</TextWrap>
              <SearchBox value={` ${lesson.date}  ${lesson.time} `} readOnly />
            </Container>

            <Container>
              <TextWrap> Videos</TextWrap>
              <input type="file" onChange={(e) => handleFileUpload(e, setVideoFiles)} multiple />
              {/* File preview for videos */}
              <FilePreviewContainer>
                {videoFiles.map((file, index) => (
                  <FilePreviewItem key={index}>
                    <video width="100" height="100" controls>
                      <source src={URL.createObjectURL(file)} type="video/mp4" />
                    </video>
                    <DeleteButton onClick={() => handleDeleteFile(index, setVideoFiles)}>X</DeleteButton>
                  </FilePreviewItem>
                ))}
              </FilePreviewContainer>
            </Container>

            <Container>
              <TextWrap> Photos </TextWrap>
              <input type="file" onChange={(e) => handleFileUpload(e, setPhotoFiles)} multiple />
              {/* File preview for photos */}
              <FilePreviewContainer>
                {photoFiles.map((file, index) => (
                  <FilePreviewItem key={index}>
                    <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} width="100" height="100" />
                    <DeleteButton onClick={() => handleDeleteFile(index, setPhotoFiles)}>X</DeleteButton>
                  </FilePreviewItem>
                ))}
              </FilePreviewContainer>
            </Container>
            <Container>
              <TextWrap> Comment </TextWrap>
              <SearchBox type="text" />
            </Container>

            <BtnBox>
              <button className={styles.btns} onClick={() => handleClear(setVideoFiles, setPhotoFiles)}> Clear </button>
              <button className={styles.btns}> Confirm </button>
              <button className={styles.btns} onClick={onClose}>Close</button>
            </BtnBox>
          </div>
        )}


      </ModalContent>
    </StyledModal>
  );
};

export default function RecentLessonList() {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [activeTab, setActiveTab] = useState("detail");
  const [videoFiles, setVideoFiles] = useState([]);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const lessonsPerSlide = 2;
  const [showModal, setShowModal] = useState(false);

  const handleViewDetail = (lesson) => {
    setSelectedLesson(lesson);
    setActiveTab("detail");
    setShowModal(true);
  };

  const handleMakeReview = (lesson) => {
    setSelectedLesson(lesson);
    setActiveTab("review");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedLesson(null);
    setActiveTab("detail");
  };

  const handlePrev = () => {
    setSlideIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : Math.floor(dummyRecentLessons.length / lessonsPerSlide) - 1
    );
  };

  const handleNext = () => {
    setSlideIndex((prevIndex) =>
      prevIndex < Math.floor(dummyRecentLessons.length / lessonsPerSlide) - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div>
      <SContainer>
        <SBtnWrap>
          <SliderButton onClick={handlePrev}><Play /></SliderButton>
          <SliderButton onClick={handleNext}><PlayBack /></SliderButton>
        </SBtnWrap>
        <RecentLessonsContainer>
          <SliderWrapper style={{ transform: `translateX(-${slideIndex * (350 + 4)}px)` }}>
            {dummyRecentLessons.map((lesson, index) => (
              <RecentLesson key={lesson.id}>
                <p>{`Customer: ${lesson.customerName}`}</p>
                <p>{`Golf Course: ${lesson.golfCourseLocation}`}</p>
                <p>{`Date: ${lesson.date}`}</p>
                <p>{`Time: ${lesson.time}`}</p>
                <BtnBox>
                  <button onClick={() => handleViewDetail(lesson)} className={styles.btns}>Detail</button>
                  <button onClick={() => handleMakeReview(lesson)} className={styles.btns}>Lesson Note</button>
                </BtnBox>
              </RecentLesson>
            ))}
          </SliderWrapper>
        </RecentLessonsContainer>
      </SContainer>

      {showModal && selectedLesson && (
        <Modal
          lesson={selectedLesson}
          activeTab={activeTab}
          onClose={handleCloseModal}
          setVideoFiles={setVideoFiles}
          setPhotoFiles={setPhotoFiles}
          videoFiles={videoFiles}
          photoFiles={photoFiles}
        />
      )}
    </div>
  );
}

// Styled components for recent lesson list
const RecentLessonsContainer = styled.div`
  display: flex;
  overflow: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  width: 100vw;
`;

const SBtnWrap = styled.div`
  display: flex;
  margin: -1em;
  position: relative;
  left: 0%;
`;

const SContainer = styled.div`
  margin: 2em;
  display: flex;
  flex-direction: column;
  width: 80em;
`;

const RecentLesson = styled.div`
  margin-bottom: 20px;
  background-color: #e2e7e0;
  border-radius: 1em;
  padding: 30px;
  margin: 0 0.5em;
  width: 350px;
`;

const SliderWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease;
`;

const SliderButton = styled.button`
  background-color: #1b4607;  
  padding: 10px;
  margin-right: 5px;
  color: #fff;
  border: none;
  display: flex;
  width: 3em;
  height: 3em;
  border-radius: 2em;
`;

const dummyRecentLessons = [
  {
    id: 1,
    customerId: 1,
    customerName: "John Doe",
    golfCourseLocation: "ABC Golf Club",
    date: "Nov. 4 2023 Thu",
    time: "PM 2:00 - PM 3:00",
  },
  {
    id: 2,
    customerId: 2,
    customerName: "Jane Smith",
    golfCourseLocation: "XYZ Golf Resort",
    date: "Nov. 5 2023 Fri",
    time: "AM 10:30 - AM 11:30",
  },
  {
    id: 3,
    customerId: 3,
    customerName: "Bob Johnson",
    golfCourseLocation: "Golf Paradise",
    date: "Nov. 6 2023 Sat",
    time: "PM 3:30 - PM 4:30",
  },
  {
    id: 4,
    customerId: 4,
    customerName: "Alice Williams",
    golfCourseLocation: "Sunset Golf Club",
    date: "Nov. 7 2023 Sun",
    time: "AM 9:00 - AM 10:00",
  },
  {
    id: 5,
    customerId: 5,
    customerName: "Michael Brown",
    golfCourseLocation: "Green Valley Golf Course",
    date: "Nov. 8 2023 Mon",
    time: "PM 1:30 - PM 2:30",
  },
  {
    id: 6,
    customerId: 6,
    customerName: "Emily Davis",
    golfCourseLocation: "Golden Tee Golf Resort",
    date: "Nov. 9 2023 Tue",
    time: "AM 8:45 - AM 9:45",
  },
  {
    id: 7,
    customerId: 7,
    customerName: "David White",
    golfCourseLocation: "Silver Greens Golf Club",
    date: "Nov. 10 2023 Wed",
    time: "PM 4:15 - PM 5:15",
  },
  {
    id: 8,
    customerId: 8,
    customerName: "Olivia Miller",
    golfCourseLocation: "Pine Ridge Golf Course",
    date: "Nov. 11 2023 Thu",
    time: "AM 11:15 - AM 12:15",
  },
  {
    id: 9,
    customerId: 9,
    customerName: "Ethan Wilson",
    golfCourseLocation: "Blue Sky Golf Resort",
    date: "Nov. 12 2023 Fri",
    time: "PM 12:45 - PM 1:45",
  },
  {
    id: 10,
    customerId: 10,
    customerName: "Sophia Anderson",
    golfCourseLocation: "Meadow Hills Golf Club",
    date: "Nov. 13 2023 Sat",
    time: "AM 10:00 - AM 11:00",
  },
];
