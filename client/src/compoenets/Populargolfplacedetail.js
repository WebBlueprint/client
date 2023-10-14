import React from "react";
import styled, { css } from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Populargolfplacedetail = (props) => {
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
  padding: 40px 20px 20px 20px;
  background-color: #d9d9d9;
  margin-right: 40px;
  border-radius: 30px;
  width: 35%;
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
