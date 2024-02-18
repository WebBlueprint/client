import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Populargolfplacedetail from "./Populargolfplacedetail";
import ItemsCarousel from "react-items-carousel";
import "./Carousel.css";
import axios from "axios";

const Populargolfplace = () => {
  const [data, setData] = useState(true);
  const [data1, setData1] = useState([]);
  useEffect(() => {
    const lessonInfo = async () => {
      try {
        const response1 = await axios.get(
          "https://p-match-ec61fc56d612.herokuapp.com/main/top-golfcourses",
          {},
          { withCredentials: true }
        );
        //console.log(response1.data);
        setData1(...data1, response1.data);
      } catch (error) {
        console.error("사용자 확인 중 오류 발생:", error);
      }
    };
    lessonInfo();
  }, []);
  console.log(data1);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Top5place>Top 5 Popular Place</Top5place>
            <div className="scrollHorizontal" style={{ height: `45em` }}>
              <div style={{ padding: `0 ${chevronWidth}px` }}>
                <ItemsCarousel
                  requestToChangeActive={setActiveItemIndex}
                  activeItemIndex={activeItemIndex}
                  numberOfCards={1.5}
                  gutter={20}
                  leftChevron={<div className="carosuelArrow">{"<"}</div>}
                  rightChevron={<div className="carosuelArrow">{">"}</div>}
                  outsideChevron
                  chevronWidth={chevronWidth}
                >
                  <div style={{ height: 600 }}>
                    <Board>
                      {data1.map((a, b) => {
                        return (
                          <Populargolfplacedetail
                            list={a}
                            key={b}
                            center={a.courseLocation.coordinates}
                          />
                        );
                      })}
                    </Board>
                  </div>
                  <div style={{ height: 600 }}></div>
                  <div style={{ height: 600 }}></div>
                </ItemsCarousel>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Populargolfplace;

const Board = styled.div`
  height: 284px;
  margin-top: 2rem;
  display: flex;
  width: 100%;
`;

const Top5place = styled.p`
  margin: 5rem 0 0 10px;
`;
