
import Calendars from "./calendar";
import LessonReview from "./lessonReview";
import styled, { css } from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LessonHeader from "../block/Header/Header"
import React, { useState } from "react";

function Schedule() {
  const [loggedin, setLoggedin] = useState(true)
  return (
    <>
      <Board>
      <Container>
     {loggedin ? 
                <Row>
            <Col>
              <LessonHeader/>
            </Col>
          </Row> : <p>Not loggined</p>}
          </Container>
          <Board2>
        {loggedin ? <LessonReview /> :  <p>Not loggined</p>} 
        <Calendars />
        </Board2>
      </Board>

    </>
  );
}

export default Schedule;

const Board = styled.div`
  margin-top: 150px;
`;

const Board2 = styled.div`
display: flex;
justify-content:center;
`
