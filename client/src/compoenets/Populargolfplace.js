import React from "react";
import styled, { css } from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Populargolfplacedetail from "./Populargolfplacedetail";
import { useState } from "react";

const Populargolfplace = () => {
  const [golfplacelist, setGolfplacelist] = useState([
    {
      area: "Kuala Lumpur",
      areaDetail: "KLGCC - Kuala Lumpur",
      placeName: "Golf & Country Club, Bukit Kiara",
      rate: "10%",
    },
    {
      area: "쿠알라룸푸르",
      areaDetail: "가동 나번지",
      placeName: "윤철이네골프장",
      rate: "40%",
    },
    {
      area: "쿠알라룸푸르",
      areaDetail: "다동 라번지",
      placeName: "승우네골프장",
      rate: "80%",
    },
  ]);
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Board>
              <Top5place>Top 5 Popular Place</Top5place>
              {golfplacelist.map((a, b) => {
                return <Populargolfplacedetail list={a} key={b} />;
              })}
            </Board>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Populargolfplace;

const Board = styled.div`
  height: 284px;
  margin-top: 80px;
  display: flex;
  width: 100%;
`;

const Top5place = styled.p`
  position: absolute;
  bottom: -445px;
  margin-left: 25px;
`;
