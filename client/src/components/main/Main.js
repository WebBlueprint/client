import React from "react";
import Banner from "./Banner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import Popular from "./Popular";
import LessonRemaining from "../block/LessonRemaining/LessonRemaining";
import InfoHeader from "../block/Header/Header"
import SearchBar from "../search/searchbar";

const StyledSearchBar = styled(SearchBar)
`margin-top: 20px; margin-left: 70px;`;

const Main = () => {
  const defaultName = "guest";
  const defaultGender = "M";
  const defaultArea = "KL";

  return (
    <>
      <Container>
        <div style={{ marginTop: "120px" }}>
          <Banner />
          <StyledSearchBar />
          <Row>
            <InfoHeader />
          </Row>
          <Cover2>
            <Row>
              <Col>
                {/* map돌려야함*/}
                <LessonRemaining />
              </Col>
            </Row>
          </Cover2>
        </div>
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
