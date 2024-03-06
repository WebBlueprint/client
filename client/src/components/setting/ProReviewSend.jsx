import React, { useState } from "react";
import styled from "styled-components";
import RecentLessonList from "./RecentLessonList";
import SendLessonReview from "./SendLessonReview";


const Container = styled.div`
  text-align: left;
`;

const TabsContainer = styled.div`
  text-align: left;
  display: flex;
  position: relative;
  padding-right: 2em;
`;

const Tab = styled.div`
  cursor: pointer;
  margin-right: ${(props) => (props.isTab1 ? "2em" : "0")};
  margin-left: ${(props) => (props.isTab2 ? "2em" : "0")};
  color: ${(props) => (props.isSelected ? "#1b4607" : "#d9d9d9")};
  text-decoration: ${(props) => (props.isSelected ? "underline" : "none")};
`;

export default function ProReviewSend() {
  const [selectedTab, setSelectedTab] = useState("RecentLessonList"); // 초기 탭 설정

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  return (
    <Container>
      <TabsContainer>
        <Tab
          isSelected={selectedTab === "RecentLessonList"}
          isTab1
          onClick={() => handleTabClick("RecentLessonList")}
        >
          Recent Lesson List
        </Tab>

        <Tab
          isSelected={selectedTab === "SendLessonReview"}
          isTab2
          onClick={() => handleTabClick("SendLessonReview")}
        >
          Make a Lesson Note
        </Tab>
      </TabsContainer>

      <div>
        {selectedTab === "RecentLessonList" && <RecentLessonList />}
        {selectedTab === "SendLessonReview" && <SendLessonReview />}
      </div>
    </Container>
  );
}
