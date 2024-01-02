import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Popularprodetail from "./Popularprodetail";
import { useState } from "react";
import axios from "axios";


const Popularpro = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const popularPros = async () => {
      try {
        const response = await axios.get(
          "https://p-match-ec61fc56d612.herokuapp.com/popular-pros",
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
  const [data1, setData1] = useState([]);
  useEffect(() => {
    const lessonInfo = async () => {
      try {
        const response1 = await axios.get(
          "https://p-match-ec61fc56d612.herokuapp.com/main/lesson-info",
          {},
          { withCredentials: true }
        );
        // console.log(response1.data);
        setData1(...data1, response1.data);
      } catch (error) {
        console.error("사용자 확인 중 오류 발생:", error);
      }
    };
    lessonInfo();
  }, []);
  //console.log(data);
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Top5pros>Top 5 Popular Pros</Top5pros>
            <Board>
              {data.map((a, b) => {
                return (
                  <Popularprodetail
                    reviewCount={a.reviewCount}
                    averageRating={a.averageRating}
                    proname={a.pro.name}
                    key={b}
                  />
                );
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
  margin-top: 2rem;
`;

const Top5pros = styled.p`
  margin: 0 0 0 10px;
`;
