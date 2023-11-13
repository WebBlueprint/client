import React, { useState } from "react";
import styled from "styled-components";
import style from "./LessonScheduler.module.css"

const SlotTimeSpecifics = () => {
  const [startTime, setStartTime] = useState("09:00"); // 초기 시작 시간
  const [endTime, setEndTime] = useState("18:00"); // 초기 끝 시간
  const [lessonTime, setLessonTime] = useState(30); // 초기 레슨 시간 (분 단위)
  const [breakTime, setBreakTime] = useState(10); // 초기 쉬는 시간 (분 단위)
  const [reservedTimes, setReservedTimes] = useState([]); // 예약된 시간대를 저장하는 배열

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleLessonTimeChange = (event) => {
    setLessonTime(parseInt(event.target.value, 10));
  };

  const handleBreakTimeChange = (event) => {
    setBreakTime(parseInt(event.target.value, 10));
  };

  const handleReservation = (time) => {
    // 이미 예약된 시간인지 확인
    if (reservedTimes.includes(time)) {
      // 이미 예약된 경우, 예약 취소
      setReservedTimes(
        reservedTimes.filter((reservedTime) => reservedTime !== time)
      );
    } else {
      // 예약되지 않은 경우, 예약 추가
      setReservedTimes([...reservedTimes, time]);
    }
  };

  // 예약 가능한 시간대 계산 로직
  const calculateAvailableTimes = () => {
    const availableTimes = [];
    let currentTime = new Date(`2000-01-01T${startTime}`);
    const endTimeObj = new Date(`2000-01-01T${endTime}`);
  
    while (currentTime < endTimeObj) {
      availableTimes.push(
        currentTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit"
        })
      );
      currentTime.setMinutes(currentTime.getMinutes() + lessonTime);
      currentTime.setMinutes(currentTime.getMinutes() + breakTime);
    }
  
    return availableTimes;
  };
  const availableTimes = calculateAvailableTimes();



  return (
    <div>
        <BigWrap >
            <div>
      <label>
        Start Time: </label>
        <input type="time" value={startTime} onChange={handleStartTimeChange} />
      </div>

<div>
      <label>
        End Time: </label>
        <input type="time" value={endTime} onChange={handleEndTimeChange} />
     </div>

      </BigWrap>
      <BigWrap >
    <div>
      <label>
        Lesson Duration (minutes):      </label>
        <select value={lessonTime} onChange={handleLessonTimeChange}>
          {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((time) => (
            <option key={time} value={time}>
              {time} Mins
            </option>
          ))}
        </select> 
 
      </div>
      <div>
      <label>
        Break Time (minutes):   </label>
        <select value={breakTime} onChange={handleBreakTimeChange}>
          {[5, 10, 15, 20, 30, 40, 50].map((time) => (
            <option key={time} value={time}>
              {time} Mins
            </option>
          ))}
        </select>
    
      </div>
      </BigWrap>

      <div>
        {/* 예약 가능한 시간을 버튼으로 출력 */}
        {availableTimes.map((time, index) => (
          <button
            key={index}
            onClick={() => handleReservation(time)}
            style={{
              backgroundColor: reservedTimes.includes(time) ? "green" : ""
            }}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SlotTimeSpecifics;

const BigWrap = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
grid-gap: 10px;
`;

