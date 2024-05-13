import React, { useState, useEffect } from "react";
import { ReactComponent as Gps } from "./Gps.svg";
import { ReactComponent as GpsW } from "./GpsW.svg";
import { ReactComponent as Play } from "./Play.svg";
import { ReactComponent as Playback } from "./Playback.svg";
import { ReactComponent as Mypro } from "./Mypro.svg";
import { ReactComponent as AddPro } from "./AddPro.svg";
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
  const [likedPros, setLikedPros] = useState([]);

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

  const handleLikeClick = () => {
    if (selectedProIndex !== null) {
      const updatedLikedPros = likedPros.some(
        (pro) => pro.index === selectedProIndex
      )
        ? likedPros.filter((pro) => pro.index !== selectedProIndex)
        : [
            ...likedPros,
            {
              index: selectedProIndex,
              name: proboxData[selectedProIndex].Proname,
              liked: true,
            },
          ];
      setLikedPros(updatedLikedPros);

      sessionStorage.setItem("likedPros", JSON.stringify(updatedLikedPros));
    }
  };

  const handleBooking = () => {
    if (
      selectedProIndex !== null &&
      selectedDateIndex !== null &&
      selectedTimeIndex !== null
    ) {
      const proName = proboxData[selectedProIndex].Proname;
      const selectedDate = nextDates[selectedDateIndex];
      const selectedTime =
        proboxData[selectedProIndex].availableSlot.reservedTimes[
          selectedTimeIndex
        ];
      const bookingInfo = {
        proName,
        selectedDate,
        selectedTime,
      };
      const bookings = JSON.parse(sessionStorage.getItem("bookings")) || [];
      bookings.push(bookingInfo);
      sessionStorage.setItem("bookings", JSON.stringify(bookings));

      setBookingMessage("Booking Completed");
      setModalVisible(true);

      // Reset selected data
      setSelectedProIndex(null);
      setSelectedDateIndex(null);
      setSelectedTimeIndex(null);
    } else {
      setBookingMessage("Please select a time or date.");
      setModalVisible(true);
    }
  };

  useEffect(() => {
    const storedLikedPros =
      JSON.parse(sessionStorage.getItem("likedPros")) || [];
    setLikedPros(storedLikedPros);

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
          nextDatesArray.push(
            nextDate.toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
            })
          );
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
        <div className={styles.bookingContainer}>
          <div className={styles.iconwrap}>
            <div onClick={handlePrev} className={styles.iconwrap1}>
              {" "}
              <Playback />{" "}
            </div>
            <div onClick={handleNext} className={styles.iconwrap2}>
              {" "}
              <Play />{" "}
            </div>
          </div>
          <div
            className={styles.bookingWrapper}
            style={{
              transform: `translateX(-${slideIndex * slideWidth}px)`,
              width: `${totalWidth}px`,
            }}
          >
            {proboxData.map((item, index) => (
              <div
                key={index}
                className={`${styles.bookingItem} ${
                  selectedProIndex === index && styles.selectedPro
                }`}
                onClick={() => handleProClick(index)}
              >
                <div className={styles.box1}>
                  <div>
                    <Gps />
                  </div>
                  <div>
                    <div>
                      <b> {item.Location1}</b> <br /> {item.Location2}
                    </div>
                    <div>{item.GolfCourseName}</div>
                  </div>
                </div>
                <br />
                <div className={styles.box2}>
                  <img src={item.image} alt="Profile" className={styles.imgs} />
                  <div>
                    <div>{item.Proname}</div>
                    <div>
                      <div
                        className={styles.likeButton}
                        onClick={handleLikeClick}
                      >
                        {likedPros.some((pro) => pro.index === index) ? (
                          <>
                            <Mypro />
                            <span className={styles.likeButtontext}>Added</span>
                          </>
                        ) : (
                          <>
                            <AddPro />
                            <span className={styles.likeButtontext}>
                              Add My Pro
                            </span>
                          </>
                        )}
                      </div>
                    </div>
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
                const dayOfWeek = new Intl.DateTimeFormat("en-US", {
                  weekday: "short",
                }).format(dateObj);
                return (
                  <button
                    key={index}
                    className={`${styles.btndate} ${
                      selectedDateIndex === index && styles.selected
                    }`}
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
              {proboxData[selectedProIndex].availableSlot.reservedTimes.map(
                (time, index) => (
                  <button
                    key={index}
                    className={`${styles.btntime} ${
                      selectedTimeIndex === index && styles.selected
                    }`}
                    onClick={() => handleTimeClick(index)}
                  >
                    {time}
                  </button>
                )
              )}
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
            <span
              className={styles.close}
              onClick={() => setModalVisible(false)}
            >
              &times;
            </span>{" "}
            <br />
            <h3 className={styles.modalTitle}>Booking Confirmation</h3> <hr />
            {selectedProIndex !== null &&
              selectedDateIndex !== null &&
              selectedTimeIndex !== null && (
                <div className={styles.bookingInfo}>
                  <p>
                    You have successfully booked an appointment with{" "}
                    {proboxData[selectedProIndex].Proname}.
                  </p>
                  <p>
                    Date: {nextDates[selectedDateIndex]}{" "}
                    <b>
                      {
                        proboxData[selectedProIndex].availableSlot
                          .reservedTimes[selectedTimeIndex]
                      }
                    </b>{" "}
                  </p>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
