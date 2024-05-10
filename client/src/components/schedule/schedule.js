import Calendars from "./calendar";
import LessonReview from "./lessonReview";
import styled, { css } from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LessonHeader from "../block/Header/Header";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Schedule() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const popularPros = async () => {
      try {
        const response = await axios.get(
          "https://p-match-ec61fc56d612.herokuapp.com/lesson/personal-lessons/user1",
          {},
          { withCredentials: true }
        );
        console.log(response.data);
        setData(...data, response.data);
      } catch (error) {
        console.error("사용자 확인 중 오류 발생:", error);
      }
    };
    popularPros();
  }, []);
  const [reservations, setReservations] = useState([
    {
      reservation_id: "",
      user_id: "",
      pro_id: "김윤철",
      reservation_time: "PM 4:00",
      reservation_date: "Fri Nov 24 2023",
      reservation_place: "Montkiara",
      created_at: "",
    },
    {
      reservation_id: "",
      user_id: "",
      pro_id: "윤승우",
      reservation_time: "PM 2:00",
      reservation_date: "Sat Nov 25 2023",
      reservation_place: "SouthBangsar",
      created_at: "",
    },
  ]);
  const [loggedin, setLoggedin] = useState(true);
  return (
    <>
      <Board>
        <Container>
          {loggedin ? (
            <Row>
              <Col>
                <LessonHeader />
              </Col>
            </Row>
          ) : (
            <p>Not loggined</p>
          )}
        </Container>
        <Board2>
          {loggedin ? <LessonReview /> : <p>Not loggined</p>}
          <Calendars reservations={reservations} />
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
  justify-content: center;
`;
