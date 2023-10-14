import React from "react";
import styled, { css } from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Popularprodetail = (props) => {
  return (
    <Board>
      <div style={{ display: "flex" }}>
        <Profile />
        <Details>
          <Icon>icon</Icon>
          <b>{props.list.area}</b>
        </Details>
      </div>
      <Details2>
        <p>{props.list.areaDetail}</p>
        <p>{props.list.placeName}</p>
      </Details2>

      <Container>
        <Row>
          <Col style={{ padding: "0 0 0 20px" }}>
            <p style={{ color: "#1B4607", fontSize: "18px" }}>
              <b>My Pro</b>
            </p>
            <div style={{ lineHeight: "2px" }}>
              <p>Reaming 10 Lessons</p>
              <p>(10/20)</p>
            </div>
          </Col>

          <Col>
            <Chatbutton>Chat with Pro</Chatbutton>
          </Col>
        </Row>
      </Container>
    </Board>
  );
};

export default Popularprodetail;

const Board = styled.div`
  padding: 40px 20px 20px 20px;
  background-color: #d9d9d9;
  border-radius: 30px;
  width: 100%;
  margin: 0 10px 0 10px;
`;

const Profile = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: tomato;
  margin-right: 25px;
`;

const Icon = styled.div`
  margin-right: 9px;
`;

const Details = styled.div`
  display: flex;
  margin-top: 16px;
`;

const Details2 = styled.div`
  position: relative;
  top: -55px;
  left: 165px;
  font-size: 13px;
  line-height: 2px;
`;

const Chatbutton = styled.button`
  margin: 30px 0 0 30px;
  font-size: 14px;
`;
