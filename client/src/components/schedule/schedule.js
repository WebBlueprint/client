
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

    </>
  );
}

export default Schedule;

const Board = styled.div`
  display: flex;
  margin-top: 150px;
`;
