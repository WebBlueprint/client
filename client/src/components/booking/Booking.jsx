import React, { useState, useEffect } from "react";
import { ReactComponent as Gps } from "./Gps.svg";
import { ReactComponent as Play } from "./Play.svg";
import { ReactComponent as Playback } from "./Playback.svg";
import styles from "./Booking.module.css";
import proboxData from "./Booking_probox.json";

const Booking = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [selectedProSlot, setSelectedProSlot] = useState(null); // 클릭한 프로의 availableSlot 정보 상태로 관리
  const [nextDates, setNextDates] = useState([]); // 다음 일자들을 저장하는 상태
  const slidesLength = proboxData.length;
  const slideWidth = 360;
  const totalWidth = (slidesLength + 1) * slideWidth; // 슬라이드 전체 너비 계산

  const handlePrev = () => {
    setSlideIndex((prevIndex) => (prevIndex - 1 + slidesLength) % slidesLength);
  };

  const handleNext = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % slidesLength);
  };

  const handleProClick = (index) => {
    // 클릭한 프로의 availableSlot 정보를 상태에 저장
    setSelectedProSlot(proboxData[index].availableSlot);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000); // 3초마다 다음 슬라이드로 이동
    return () => clearInterval(interval);
  }, [slideIndex]);

  useEffect(() => {
    if (selectedProSlot) {
      const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const today = new Date();
      const todayDayOfWeek = weekdays[today.getDay()]; // 오늘 요일
      const nextDatesArray = [];

      let foundNextDates = 0;
      let daysToAdd = 1; // 다음 날짜를 확인하기 위해 하루씩 증가

      while (foundNextDates < 10) {
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + daysToAdd);

        const nextDayOfWeek = weekdays[nextDate.getDay()];

        if (selectedProSlot.selectedDays.includes(nextDayOfWeek)) {
          const formattedDate = `${nextDate.toLocaleDateString()} (${nextDayOfWeek})`;
          nextDatesArray.push({ date: formattedDate, dayOfWeek: nextDayOfWeek });
          foundNextDates++;
        }

        daysToAdd++; // 다음 날짜로 이동
      }

      setNextDates(nextDatesArray);
    }
  }, [selectedProSlot]);

  const handleDateClick = (date) => {
    console.log("Clicked Date:", date);
  };

  return (
    <div className={styles.appsin}>
      <div className={styles.cover}>
        <div> booking </div>
        <div>
          <span onClick={handlePrev}>앞으로</span>
          <span onClick={handleNext}>뒤로</span>
        </div>

        <div className={styles.bookingContainer}>
          <div
            className={styles.bookingWrapper}
            style={{
              transform: `translateX(-${slideIndex * slideWidth}px)`,
              width: `${totalWidth}px`, // 슬라이드 전체 너비 적용
            }}
          >
            {proboxData.map((item, index) => (
              <div key={index} className={styles.bookingItem} onClick={() => handleProClick(index)}>
                <Gps />
                <div>{item.Proname}</div>
                <div>{`${item.Location1} - ${item.Location2}`}</div>
                <div>{item.GolfCourseName}</div>
                <div>{item.Like === "1" ? "Liked" : "Not Liked"}</div>
                <img src={item.image} alt="Profile" />
              </div>
            ))}
            {/* 첫 번째 슬라이드 복사하여 마지막에 추가 */}
            {proboxData.slice(0, 1).map((item, index) => (
              <div key={slidesLength + index} className={styles.bookingItem} onClick={() => handleProClick(index)}>
                <Gps />
                <div>{item.Proname}</div>
                <div>{`${item.Location1} - ${item.Location2}`}</div>
                <div>{item.GolfCourseName}</div>
                <div>{item.Like === "1" ? "Liked" : "Not Liked"}</div>
                <img src={item.image} alt="Profile" />
              </div>
            ))}
          </div>
        </div>

        {/* 클릭한 프로의 availableSlot 정보 표시 */}
        {selectedProSlot && (
          <div>
            <div>Selected Pro's Available Slot:</div>
            <div>Date: {selectedProSlot.selectedDays.join(", ")}</div>
            {/* 다음 예약 가능한 날짜들 표시 */}
            <div>
              {nextDates.map((date, index) => (
                <button key={index} onClick={() => handleDateClick(date.date)}>
                  {date.date}
                </button>
              ))}
            </div>
            <div>Start Time: {selectedProSlot.startTime}</div>
            <div>End Time: {selectedProSlot.endTime}</div>
            <div>Reserved Times: {selectedProSlot.reservedTimes.join(", ")}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
