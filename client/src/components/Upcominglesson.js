import React from "react";
import styled, { css } from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Upcominglesson = (props) => {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Cover>
              <ProImg>img</ProImg>

              <Cover2>
                <p>My Pro</p>
                <p>{props.list.proName}</p>
                <p>{props.list.date}</p>
                <p>{props.list.time}</p>
                <p>{props.list.remainCount}</p>
                <button>View Details</button>
              </Cover2>
            </Cover>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Upcominglesson;

const Cover = styled.div`
  display: flex;
  align-items: center;
  width: 270px;
  height: 224px;
  background: #d9d9d9;
`;
const Cover2 = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const ProImg = styled.div`
  margin: 0 30% 0 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: tomato;
`;
