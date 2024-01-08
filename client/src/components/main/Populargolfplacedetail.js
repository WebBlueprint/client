import React, { useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import styled, { css } from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GoogleMaps from "./Googlemaps.js";

const Populargolfplacedetail = (props) => {
  const [center, setCenter] = useState({
    lat: 37.56667,
    lng: 122.02333,
  });
  const [markers, setMarkers] = useState([
    {
      position: {
        lat: 37.56667,
        lng: 122.02333,
      },
      title: "서울",
    },
    {
      position: {
        lat: 35.66667,
        lng: 128.97333,
      },
      title: "부산",
    },
  ]);
  return (
    <Board>
      <GoogleMaps/>  
      <Container>
        <Row>
          <Col style={{ padding: "0 0 0 20px" }}>
          <Details>
          <p>{props.list.placeName}</p>
      </Details>
      <Details>
      <p>{props.list.area}</p>
      </Details>
      <Details2>
      <p>{props.list.areaDetail}</p>
      </Details2>
            <Star>
              <Starspan style={{ width: props.list.rate }}></Starspan>
            </Star>
            <Detailbutton>View Details</Detailbutton>  
          </Col>
        </Row>
      </Container>
    </Board>
  );
};

export default Populargolfplacedetail;

const Board = styled.div`
  padding: 30px 2% 20px 2%;
  background-color: #d9d9d9;
  margin: 0 10px 0 10px;
  border-radius: 30px;
  width: 100%;
  height: 480px;
  display: flex;
  flex-direction: column;
`;

const Details = styled.div`
display:flex;
flex-wrap:wrap;
justify-content:center;
  font-size: 13px;
  line-height: 2px;
  
`;

const Details2 = styled.div`
display:flex;
flex-wrap:wrap;
justify-content:center;
  font-size: 21px;
  line-height: 2px;
  margin-top: 1rem;
`;

const Star = styled.div`
  display: flex;
  margin: 0 auto;
  background: url(https://aldo814.github.io/jobcloud/html/images/user/star_bg02.png)
    no-repeat;
  width: 121px;
  height: 20px;
  position: relative;
`;

const Starspan = styled.span`
  position: absolute;
  background: url(https://aldo814.github.io/jobcloud/html/images/user/star02.png);
  width: auto;
  height: 20px;
`;

const Detailbutton = styled.button`
  display: flex;
  margin: 0 auto;
  margin-top: 20px;
  font-size: 14px;
`;
