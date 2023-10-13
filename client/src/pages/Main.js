import React from "react";
import Banner from "../compoenets/Banner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const Main = () => {
  const defaultName = "guest";
  const defaultGender = "M";
  const defaultArea = "KL";
  return (
    <Container>
      <Banner />
      <h1>This is main page</h1>
      <Row>
        <Col>
          <Cover>
            <Introduce>
              <Circle />
              Hello {defaultName}
            </Introduce>
            <GenderArea>
              Gender : {defaultGender} <Vertical /> Area : {defaultArea}
            </GenderArea>
          </Cover>
        </Col>
      </Row>
      <Cover2>
        <Row>
          <Col>
            <SmCover>
              <Link to="/reservations">Upcoming Reservations</Link>
            </SmCover>
          </Col>

          <Col>
            <SmCover>
              <Link to="/review">My Lesson Review</Link>
            </SmCover>
          </Col>

          <Col>
            <SmCover>
              <Link to="/schedules">View All Schedules</Link>
            </SmCover>
          </Col>

          <Col>
            <SmCover2>
              <Link to="/talk_pro">Talk to the Pro</Link>
            </SmCover2>
          </Col>
        </Row>
      </Cover2>
    </Container>
  );
};

export default Main;

const Cover = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #d9d9d9;
  margin-top: 50px;
  height: 87px;
  border-radius: 30px;
`;

const Cover2 = styled.div`
  margin-top: 50px;
`;

const SmCover = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  background: #d9d9d9;
  height: 285px;
  border-radius: 30px;
`;

const SmCover2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #d9d9d9;
  height: 285px;
  border-radius: 30px;
`;

const GenderArea = styled.div`
  display: flex;
  margin-right: 10px;
`;

const Introduce = styled.div`
  display: flex;
  align-items: center;
`;

const Circle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: tomato;
  margin-left: 10px;
`;

const Vertical = styled.div`
  border-left: 0.5px solid #000;
  height: 30px;
  margin: 0 30px 0 30px;
`;
