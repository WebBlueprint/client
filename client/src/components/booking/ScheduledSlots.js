import React, { useState } from "react";
import styles from "../booking/booking.module.css";

const timeSlotsData = {
  MON: [
    { time: "8:00 - 9:00" },
    { time: "9:00 - 10:00" },
    { time: "10:00 - 11:00" },
    { time: "11:00 - 12:00" },
    { time: "1:00 - 2:00" },
  ],
  TUE: [
    { time: "13:00 - 14:00" },
    { time: "15:00 - 16:00" },
    { time: "17:00 - 18:00" },
  ],
  WED: [
    { time: "13:00 - 14:00" },
    { time: "15:00 - 16:00" },
    { time: "17:00 - 18:00" },
  ],
  THU: [
    { time: "8:00 - 9:00" },
    { time: "9:00 - 10:00" },
    { time: "10:00 - 11:00" },
  ],
  FRI: [
    { time: "13:00 - 14:00" },
    { time: "18:00 - 19:00" },
    { time: "20:00 - 21:00" },
  ],
  SAT: [
    { time: "8:00 - 9:00" },
    { time: "9:00 - 10:00" },
    { time: "16:00 - 17:00" },
  ],
  SUN: [
    { time: "13:00 - 14:00" },
    { time: "15:00 - 16:00" },
    { time: "17:00 - 18:00" },
  ],
};

function ScheduledSlots({ day }) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSlotClick = (index) => {
    setSelectedSlot((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleBookNowClick = () => {
    // Add logic to handle the "Book Now" action
    console.log("Book Now clicked for slot:", selectedSlot);

    // Show the modal
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    // Close the modal
    setIsModalOpen(false);

    // Hide the "Book Now" button after booking
    setSelectedSlot(null);
  };

  const timeSlots = timeSlotsData[day] || [];

  return (
    <div>
      <div className={styles.scheduledSlots}>
        {timeSlots.map((slot, index) => (
          <div
            key={index}
            className={`${styles.slotContainer} ${
              selectedSlot === index ? styles.clicked2 : ""
            }`}
            onClick={() => {
              handleSlotClick(index);
            }}
          >
            <div>{slot.time}</div>
          </div>
        ))}
      </div>
      <div>
        {selectedSlot !== null && (
          <div className={styles.bookContainer}>
            <button
              className={styles.bookNowButton}
              onClick={handleBookNowClick}
            >
              Book Now
            </button>
          </div>
        )}
      </div>

      {/* 모달 컴포넌트 */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <p className={styles.modalTitle}>예약 완료!</p>
              <button className={styles.closeButton} onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              <p>예약이 완료되었습니다!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ScheduledSlots;