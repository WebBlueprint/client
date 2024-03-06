import React, { useState, useEffect } from "react";
import { ReactComponent as Gps } from "./Gps.svg";
import { ReactComponent as Play } from "./Play.svg";
import { ReactComponent as Playback } from "./Playback.svg";
import styles from "./Booking.module.css";
import proboxData from "./Booking_probox.json";

const Booking = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [selectedProIndex, setSelectedProIndex] = useState(null);
  const [nextDates, setNextDates] = useState([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(null);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");

  const slidesLength = proboxData.length;
  const slideWidth = 360;
  const totalWidth = (slidesLength + 1) * slideWidth;

  const handlePrev = () => {
    setSlideIndex((prevIndex) => (prevIndex - 1 + slidesLength) % slidesLength);
  };

  const handleNext = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % slidesLength);
  };

  const handleProClick = (index) => {
    setSelectedProIndex(index);
  };

  const handleDateClick = (index) => {
    setSelectedDateIndex(index);
  };

  const handleTimeClick = (index) => {
    setSelectedTimeIndex(index);
  };

  const handleBooking = () => {
    if (selectedProIndex !== null && selectedDateIndex !== null && selectedTimeIndex !== null) {
      // 프로 이름과 선택한 날짜, 시간을 세션 스토리지에 저장
      const proName = proboxData[selectedProIndex].Proname;
      const selectedDate = nextDates[selectedDateIndex];
      const selectedTime = proboxData[selectedProIndex].availableSlot.reservedTimes[selectedTimeIndex];
      const bookingInfo = {
        proName,
        selectedDate,
        selectedTime,
      };
      const bookings = JSON.parse(sessionStorage.getItem("bookings")) || [];
      bookings.push(bookingInfo);
      sessionStorage.setItem("bookings", JSON.stringify(bookings));

      // 부킹이 완료되었다는 모달 메시지 표시
      setBookingMessage("Booking Completed");
      setModalVisible(true);
    } else {
      setBookingMessage("Please select a time or date.");
      setModalVisible(true);
    }
  };

  useEffect(() => {
    if (selectedProIndex !== null) {
      const selectedProSlot = proboxData[selectedProIndex].availableSlot;
      const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const today = new Date();
      const todayDayOfWeek = weekdays[today.getDay()];
      const nextDatesArray = [];

      let foundNextDates = 0;
      let daysToAdd = 1;

      while (foundNextDates < 10) {
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + daysToAdd);

        const nextDayOfWeek = weekdays[nextDate.getDay()];

        if (selectedProSlot.selectedDays.includes(nextDayOfWeek)) {
          nextDatesArray.push(nextDate.toLocaleDateString("en-US", { month: "short", day: "2-digit" }));
          foundNextDates++;
        }

        daysToAdd++;
      }

      setNextDates(nextDatesArray);
    }
  }, [selectedProIndex]);

  return (
    <div className={styles.appsin}>
      <div className={styles.cover}>
        <div> Booking </div>
        <div>
          <span onClick={handlePrev}>앞으로</span>
          <span onClick={handleNext}>뒤로</span>
        </div>

        <div className={styles.bookingContainer}>
          <div
            className={styles.bookingWrapper}
            style={{
              transform: `translateX(-${slideIndex * slideWidth}px)`,
              width: `${totalWidth}px`,
            }}
          >
            {proboxData.map((item, index) => (
              <div key={index} className={styles.bookingItem} onClick={() => handleProClick(index)}>
                <div className={styles.box1}>
                  <div>
                    <Gps />
                  </div>
                  <div>
                    <div>
                      {item.Location1} <br /> {item.Location2}
                    </div>
                    <div>{item.GolfCourseName}</div>
                  </div>
                </div>
                <br />
                <div className={styles.box2}>
                  <img src={item.image} alt="Profile" className={styles.imgs} />
                  <div>
                    <div>{item.Proname}</div>
                    <div>{item.Like === "1" ? "Liked" : "Not Liked"}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedProIndex !== null && (
          <div className={styles.schedulebox}>
            <div>{proboxData[selectedProIndex].Proname}'s Available Slot:</div>
            <div>
              {nextDates.map((date, index) => {
                const dateObj = new Date(date);
                const dayOfWeek = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(dateObj);
                return (
                  <button
                    key={index}
                    className={`${styles.btndate} ${selectedDateIndex === index && styles.selected}`}
                    onClick={() => handleDateClick(index)}
                  >
                    <b>{dayOfWeek}</b> <br />
                    {date}
                  </button>
                );
              })}
            </div>
            <hr />
            <div>
              {proboxData[selectedProIndex].availableSlot.reservedTimes.map((time, index) => (
                <button
                  key={index}
                  className={`${styles.btntime} ${selectedTimeIndex === index && styles.selected}`}
                  onClick={() => handleTimeClick(index)}
                >
                  {time}
                </button>
              ))}
            </div>

            <button className={styles.btnbooking} onClick={handleBooking}>
              Booking
            </button>
          </div>
        )}
      </div>

      {modalVisible && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={() => setModalVisible(false)}>
              &times;
            </span>
            <p>{bookingMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
