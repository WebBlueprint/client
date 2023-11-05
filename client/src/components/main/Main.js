import React from "react";
<<<<<<< HEAD:client/src/pages/Main.js
import Banner from "../components/Banner";
=======
import Banner from "./Banner";
>>>>>>> 834a486db9c016655b339eaae0d12a675caceca2:client/src/components/main/Main.js
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
<<<<<<< HEAD:client/src/pages/Main.js
import Popular from "../components/Popular";
import Upcoming from "../components/Upcoming";
import GlobalFont from "../Theme/GlobalFont";
import Search from "../components/Search";
=======
import Popular from "./Popular";
>>>>>>> 834a486db9c016655b339eaae0d12a675caceca2:client/src/components/main/Main.js

const Main = () => {
  const defaultName = "guest";
  const defaultGender = "M";
  const defaultArea = "KL";
  return (
    <>
      <GlobalFont />
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
        <Search />
        <Cover2>
          <Row>
            <Col>
              <Upcoming />
            </Col>
          </Row>
        </Cover2>
      </Container>
      <Popular />
    </>
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
  margin: 0 10px 0 10px;
`;

const Cover2 = styled.div`
  margin-top: 50px;
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
