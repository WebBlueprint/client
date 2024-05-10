import React, { useState } from "react";
import styled, { css } from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-modal";

const Popularprodetail = (props) => {
  console.log(props);
  const [isOpen, setIsOpen] = useState(false);
  const clickHandler = () => {
    setIsOpen(() => !isOpen);
  };
  return (
    <Board>
      <div style={{ display: "flex" }}>
        <Profile />
        <Details>
          <Icon></Icon>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Bold>Pro Name</Bold>
            <p style={{ color: "gray", fontSize: "18px" }}>
              {props.proName}
              <br />
              <Bold>성별</Bold>
              {props.proGender == "male" ? "남" : "여"}
            </p>
          </div>
        </Details>
      </div>
      <Details2></Details2>

      <Container>
        <Row>
          <Col style={{ marginBottom: "1rem", textAlign: "center" }}>
            <Star style={{ marginTop: "1.5rem" }}>
              <Starspan
                style={{ width: props.averageRating * 20 + "%" }}
              ></Starspan>
            </Star>

            <ViewDetails onClick={clickHandler}>View Details</ViewDetails>
            <Modal
              appElement={document.getElementById("root")}
              isOpen={isOpen}
              style={modalStyles}
            >
              <h2>Details</h2>
              <h4>Total Reviews</h4>
              <p>{props.reviewCount}</p>
              <h4>Average Rating</h4>
              <p>{props.averageRating}</p>
              <button onClick={() => setIsOpen(false)}>Close</button>
            </Modal>
          </Col>
        </Row>
      </Container>
    </Board>
  );
};

export default Popularprodetail;

const Board = styled.div`
  padding: 20px 20px 20px 20px;
  background-color: #d9d9d9;
  border-radius: 30px;
  width: 100%;
  margin: 0 10px 0 10px;
`;

const Profile = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: tomato;
  margin-right: 10px;
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

const ViewDetails = styled.button`
  margin: 20px 0 0 0;
  text-align: center;
  font-size: 14px;
  width: 10rem;
`;

const Bold = styled.p`
  color: #1b4607;
  font-size: 18px;
  margin: 0;
`;

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

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
