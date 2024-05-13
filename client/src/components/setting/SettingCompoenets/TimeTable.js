import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
const Timetable = () => {
  const [selectedRange, setSelectedRange] = useState({
    start: undefined,
    end: undefined,
  });

  const handleNumberClick = (e) => {
    setSelectedRange({ start: e.target.name, end: "" });
    // 클릭된 숫자를 기반으로 선택된 범위 업데이트
    if (e.target.name < selectedRange.start) {
      setSelectedRange({ start: e.target.name, end: selectedRange.end });
    } else if (e.target.name > selectedRange.start) {
      setSelectedRange({ start: selectedRange.start, end: e.target.name });
    } else if (e.target.name == selectedRange.start) {
      setSelectedRange({ start: undefined, end: undefined });
    }
  };
  useEffect(() => {
    console.log(selectedRange);
  }, [selectedRange]);

  return (
    <>
      <Board onClick={handleNumberClick}>
        <Time name="07:00" selectedRange={selectedRange}>
          07:00
        </Time>
        <Time name="07:30" selectedRange={selectedRange}>
          07:30
        </Time>
        <Time name="08:00" selectedRange={selectedRange}>
          08:00
        </Time>
        <Time name="08:30" selectedRange={selectedRange}>
          08:30
        </Time>
        <Time name="09:00" selectedRange={selectedRange}>
          09:00
        </Time>
        <Time name="09:30" selectedRange={selectedRange}>
          09:30
        </Time>
        <Time name="10:00" selectedRange={selectedRange}>
          10:00
        </Time>
        <Time name="10:30" selectedRange={selectedRange}>
          10:30
        </Time>
        <Time name="11:00" selectedRange={selectedRange}>
          11:00
        </Time>
        <Time name="11:30" selectedRange={selectedRange}>
          11:30
        </Time>
        <Time name="12:00" selectedRange={selectedRange}>
          12:00
        </Time>
        <Time name="12:30" selectedRange={selectedRange}>
          12:30
        </Time>
        <Time name="13:00" selectedRange={selectedRange}>
          13:00
        </Time>
        <Time name="13:30" selectedRange={selectedRange}>
          13:30
        </Time>
        <Time name="14:00" selectedRange={selectedRange}>
          14:00
        </Time>
        <Time name="14:30" selectedRange={selectedRange}>
          14:30
        </Time>
        <Time name="15:00" selectedRange={selectedRange}>
          15:00
        </Time>
        <Time name="15:30" selectedRange={selectedRange}>
          15:30
        </Time>
        <Time name="16:00" selectedRange={selectedRange}>
          16:00
        </Time>
        <Time name="16:30" selectedRange={selectedRange}>
          16:30
        </Time>
        <Time name="17:00" selectedRange={selectedRange}>
          17:00
        </Time>
        <Time name="17:30" selectedRange={selectedRange}>
          17:30
        </Time>
        <Time name="18:00" selectedRange={selectedRange}>
          18:00
        </Time>
        <Time name="18:30" selectedRange={selectedRange}>
          18:30
        </Time>
        <Time name="19:00" selectedRange={selectedRange}>
          19:00
        </Time>
        <Time name="19:30" selectedRange={selectedRange}>
          19:30
        </Time>
        <Time name="20:00" selectedRange={selectedRange}>
          20:00
        </Time>
        <Time name="20:30" selectedRange={selectedRange}>
          20:30
        </Time>
        <Time name="21:00" selectedRange={selectedRange}>
          21:00
        </Time>
        <Time name="21:30" selectedRange={selectedRange}>
          21:30
        </Time>
        <Time name="22:00" selectedRange={selectedRange}>
          22:00
        </Time>
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
  background-color: ${(props) =>
    props.selectedRange.start == props.name ? "black" : "white"};
`;
