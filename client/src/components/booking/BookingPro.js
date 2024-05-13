import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

const BookingPro = (props) => {
  const [clicked, setClicked] = useState(true);
  const [whatClicked, setWhatClicked] = useState("");
  const clickHandler = (e) => {
    setWhatClicked(e.target.innerText);
    if (e.target.innerText == whatClicked) {
      setClicked(!clicked);
    } else {
      setClicked(false);
    }
  };

  const [timeClicked, setTimeClicked] = useState(true);
  const [whatTimeClicked, setWhatTimeClicked] = useState("");
  const timeClickHandler = (e) => {
    setWhatTimeClicked(e.target.innerText);
    if (e.target.innerText == whatTimeClicked) {
      setTimeClicked(!timeClicked);
    } else {
      setTimeClicked(false);
    }
  };
  const submitButtonHandler = () => {
    console.log(whatClicked, whatTimeClicked);
  };
  useEffect(() => {
    console.log(clicked, timeClicked, whatClicked, whatTimeClicked);
  }, [clicked, timeClicked, whatClicked, whatTimeClicked]);
  return (
    <>
      <Box>
        <div>
          <div>Pro name : {props.proName}</div>
          <div>Pro place : {props.place}</div>
          <div>Available Slot</div>
          {/* Mypage에서 가능한 날짜 정보 받아와서 띄워주기 */}
        </div>
      </Box>
      <SubmitButton onClick={submitButtonHandler}>Submit</SubmitButton>
    </>
  );
};

export default BookingPro;

const Select = styled.button`
  background-color: ${(props) =>
    props.children.includes(props.whatClicked) ? `green` : `white`};
  &:hover,
  &:active,
  &:focus {
    background-color: "green";
  }
  display: flex;
  width: 7rem;
  height: 2rem;
  border: solid 1px green;
`;

const Select1 = styled.button`
  background-color: ${(props) =>
    props.children.includes(props.whatTimeClicked) ? `green` : `white`};
  &:hover,
  &:active,
  &:focus {
    background-color: "green";
  }
  display: flex;
  width: 7rem;
  height: 2rem;
  border: solid 1px green;
`;
const Box = styled.div`
  display: flex;
`;

const SubmitButton = styled.button``;
