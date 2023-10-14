import React from "react";
import styled, { css } from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Popularprodetail from "./Popularprodetail";
import { useState } from "react";

const Popularpro = () => {
  const [prolist, setProlist] = useState([
    {
      area: "Kuala Lumpur",
      areaDetail: "KLGCC - Kuala Lumpur",
      placeName: "Golf & Country Club, Bukit Kiara",
    },
    {
      area: "test",
      areaDetail: "test2",
      placeName: "test3",
    },
    {
      area: "test4",
      areaDetail: "test5",
      placeName: "test6",
    },
  ]);
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Board>
              {prolist.map((a, b) => {
                return <Popularprodetail list={a} key={b} />;
              })}
            </Board>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Popularpro;

const Board = styled.div`
  display: flex;
  width: 100%;
  height: 284px;
`;
