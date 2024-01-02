import React, { useState } from "react";
import styled, { css } from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Populargolfplacedetail from "./Populargolfplacedetail";
import ItemsCarousel from 'react-items-carousel';
import './Carousel.css'

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
    {
      area: "수원시",
      areaDetail: "가나다동 라마바번지",
      placeName: "골프장",
      rate: "80%",
    },
    {
      area: "수원시",
      areaDetail: "가나다동 라마바번지",
      placeName: "골프장",
      rate: "80%",
    },
  ]);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  return (
    <div>
      <Container>
        <Row>
          <Col>
          <Top5place>Top 5 Popular Place</Top5place>
          <div className='scrollHorizontal' style={{ height: `45em` }}>
          <div style={{ padding: `0 ${chevronWidth}px` }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={1.5}
        gutter={20}
        leftChevron={<div className="carosuelArrow">{'<'}</div>}
        rightChevron={<div className="carosuelArrow">{'>'}</div>}
        outsideChevron
        chevronWidth={chevronWidth}
      >
              <div style={{ height: 600}}> 
              <Board>
              {golfplacelist.map((a, b) => {
                return <Populargolfplacedetail list={a} key={b} />;
              })}
             </Board>
              </div>
        <div style={{ height: 600}}></div>
        <div style={{ height: 600}}></div>
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
