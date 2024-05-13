import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
const Timetable = (props) => {
  const [submitInfo, setSummitInfo] = useState([]);
  {
    console.log(props.value);
  }
  const [selectedRange, setSelectedRange] = useState({
    start: undefined,
    end: undefined,
  });

  const handleNumberClick = (e) => {
    if (!selectedRange.start) {
      // 시작 시간이 선택되지 않은 경우 시작 시간 설정
      setSelectedRange({ start: e.target.name, end: undefined });
    } else if (e.target.name > selectedRange.start) {
      // 클릭된 시간이 시작 시간보다 큰 경우 종료 시간 설정
      setSelectedRange({ start: selectedRange.start, end: e.target.name });
    } else {
      // 동일하거나 시작 시간 이전을 클릭하면 선택 해제
      setSelectedRange({ start: undefined, end: undefined });
    }
  };
  useEffect(() => {
    console.log(selectedRange);
  }, [selectedRange]);

  const submitButtonHandler = () => {
    if (selectedRange.start == undefined && selectedRange.end == undefined) {
      alert("시간을 고르세요");
      //시간을 안고른 경우
    } else if (
      selectedRange.start != undefined &&
      selectedRange.end == undefined
    ) {
      setSummitInfo([
        String(props.value).replace("00:00:00", selectedRange.start),
      ]);
      //한 타임만 골랐을 경우
    } else if (
      selectedRange.start != undefined &&
      selectedRange.end != undefined
    ) {
      setSummitInfo([
        String(props.value).replace("00:00:00", selectedRange.start),
        String(props.value).replace("00:00:00", selectedRange.end),
      ]);
      //처음과 끝을 설정한 경우
    }
  };
  console.log(submitInfo);
  return (
    <>
      <Board onClick={handleNumberClick}>
        <Time name="07:00" selectedrange={selectedRange}>
          07:00
        </Time>
        <Time name="07:30" selectedrange={selectedRange}>
          07:30
        </Time>
        <Time name="08:00" selectedrange={selectedRange}>
          08:00
        </Time>
        <Time name="08:30" selectedrange={selectedRange}>
          08:30
        </Time>
        <Time name="09:00" selectedrange={selectedRange}>
          09:00
        </Time>
        <Time name="09:30" selectedrange={selectedRange}>
          09:30
        </Time>
        <Time name="10:00" selectedrange={selectedRange}>
          10:00
        </Time>
        <Time name="10:30" selectedrange={selectedRange}>
          10:30
        </Time>
        <Time name="11:00" selectedrange={selectedRange}>
          11:00
        </Time>
        <Time name="11:30" selectedrange={selectedRange}>
          11:30
        </Time>
        <Time name="12:00" selectedrange={selectedRange}>
          12:00
        </Time>
        <Time name="12:30" selectedrange={selectedRange}>
          12:30
        </Time>
        <Time name="13:00" selectedrange={selectedRange}>
          13:00
        </Time>
        <Time name="13:30" selectedrange={selectedRange}>
          13:30
        </Time>
        <Time name="14:00" selectedrange={selectedRange}>
          14:00
        </Time>
        <Time name="14:30" selectedrange={selectedRange}>
          14:30
        </Time>
        <Time name="15:00" selectedrange={selectedRange}>
          15:00
        </Time>
        <Time name="15:30" selectedrange={selectedRange}>
          15:30
        </Time>
        <Time name="16:00" selectedrange={selectedRange}>
          16:00
        </Time>
        <Time name="16:30" selectedrange={selectedRange}>
          16:30
        </Time>
        <Time name="17:00" selectedrange={selectedRange}>
          17:00
        </Time>
        <Time name="17:30" selectedrange={selectedRange}>
          17:30
        </Time>
        <Time name="18:00" selectedrange={selectedRange}>
          18:00
        </Time>
        <Time name="18:30" selectedrange={selectedRange}>
          18:30
        </Time>
        <Time name="19:00" selectedrange={selectedRange}>
          19:00
        </Time>
        <Time name="19:30" selectedrange={selectedRange}>
          19:30
        </Time>
        <Time name="20:00" selectedrange={selectedRange}>
          20:00
        </Time>
        <Time name="20:30" selectedrange={selectedRange}>
          20:30
        </Time>
        <Time name="21:00" selectedrange={selectedRange}>
          21:00
        </Time>
        <Time name="21:30" selectedrange={selectedRange}>
          21:30
        </Time>
        <Time name="22:00" selectedrange={selectedRange}>
          22:00
        </Time>
        <SubmitButton onClick={submitButtonHandler}>Submit</SubmitButton>
      </Board>
    </>
  );
};

export default Timetable;

const Board = styled.div`
  padding: 0.5rem 0 0 0;
  display: flex;
  border: solid 2px green;
  flex-direction: column;
`;

const Time = styled.button`
  margin-bottom: 1rem;
  border: 1px solid black;
  border-top: none;
  border-right: none;
  border-left: none;
  &:hover,
  &:focus {
    background-color: ${(props) =>
      props.selectedrange.start != undefined ? "green" : "white"};
  }
  background-color: ${(props) =>
    props.selectedrange.start <= props.name &&
    props.name <= props.selectedrange.end
      ? "green"
      : "white"};
`;

const SubmitButton = styled.button``;
