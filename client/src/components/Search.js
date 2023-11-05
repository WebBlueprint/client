import React from "react";
import styled, { css } from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Search = () => {
  return (
    <Board>
      <Container>
        <Row>
          <Col>
            <Cover>
              <div>icon</div>위치
            </Cover>
          </Col>
          <Col>
            <Cover2>
              <div>icon</div>
              <SearchInput
                type="text"
                placeholder="Search by pro name or golf course name"
              ></SearchInput>
            </Cover2>
          </Col>
          <Col>
            <SearchButton>Search</SearchButton>
          </Col>
        </Row>
      </Container>
    </Board>
  );
};

export default Search;

const Board = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Cover = styled.div`
  display: flex;
  align-items: center;
  width: 430px;
  height: 83px;
  border-radius: 30px;
  opacity: 0.3px;
  background: #d9d9d9;
`;

const SearchInput = styled.input`
  background: #d9d9d9;
  border: none;
  width: 100%;
  height: 83px;
  border-radius: 30px;
  outline: none;
`;

const Cover2 = styled.div`
  display: flex;
  align-items: center;
  width: 640px;
  height: 83px;
  border-radius: 30px;
  opacity: 0.3px;
  background: #d9d9d9;
`;

const SearchButton = styled.button`
  width: 100px;
  height: 64px;
  border-radius: 20px;
  background: #1b4607;
  color: white;
`;
