import React, { useState } from "react";
import styled, { css } from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const Populargolfplacedetail = (props) => {
  console.log(props);

  const containerStyle = {
    width: "350px",
    height: "250px",
    borderRadius: "5%",
    marginBottom: "2rem",
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
  });
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(props);
    map.fitBounds(bounds);

    setMap(map);
  }, []);
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  return (
    <Board>
      <Container>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={props.center}
          zoom={8}
          // onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
        <Row>
          <Col style={{ padding: "0 0 0 20px" }}>
            <Details>
              <p>{props.list.courseName}</p>
            </Details>
            <Details>
              <p>{props.list.courseReview}</p>
            </Details>
            <Details2></Details2>
            <Star>
              <Starspan style={{ width: 10 }}></Starspan>
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 13px;
  line-height: 2px;
`;

const Details2 = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
