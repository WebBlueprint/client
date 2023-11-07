<<<<<<< HEAD
function Schedule() {
  return (
    <>
      <h1>
        <a style={{ color: "blue", lineHeight: 10, padding: 40 }}>
          This is schedule
        </a>
      </h1>
=======
import Calendars from "./calendar";
import LessonReview from "./lessonReview";
import styled, { css } from "styled-components";

function Schedule() {
  return (
    <>
      <Board>
        <LessonReview />
        <Calendars />
      </Board>
>>>>>>> origin/yuncheol
    </>
  );
}

export default Schedule;
<<<<<<< HEAD
=======

const Board = styled.div`
  display: flex;
  margin-top: 150px;
`;
>>>>>>> origin/yuncheol
