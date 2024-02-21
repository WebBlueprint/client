import React, { useState } from "react";
import style from "./BookingMain.module.css";
import ScheduledSlots from "./ScheduledSlots";

const BookingInfo = ({ selectedMarkerInfo }) => {
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [showTimeSlots, setShowTimeSlots] = useState(false); // 시간 슬롯 표시 여부를 추적하는 상태 추가

  const handleProfessionalClick = (professional) => {
    setSelectedProfessional(professional);
    setShowTimeSlots(true); // 전문가를 클릭했을 때 시간 슬롯을 표시
  };

  // 버튼 중 가장 긴 길이를 찾습니다.
  let maxButtonLength = 0;
  if (selectedMarkerInfo && selectedMarkerInfo.professionals) {
    selectedMarkerInfo.professionals.forEach((professional) => {
      if (professional.name.length > maxButtonLength) {
        maxButtonLength = professional.name.length;
      }
    });
  }

  return (
    <div className={style.main}>
      {selectedMarkerInfo ? (
        <div className={style.row}>
          <div className={style.courseinfo}>
            <div className={style.infoContainer}>
              <div className={style.infoHeader}>
                <h4>{selectedMarkerInfo.name}</h4>
              </div>
              <div className={style.infoBody}>
                <img className={style.roundImage} src={selectedMarkerInfo.img} alt={selectedMarkerInfo.name} />
                <p>{selectedMarkerInfo.description}</p>
              </div>
            </div>
          </div>
          <div className={style.proinfo}>
            {selectedMarkerInfo.professionals && (
              <ul>
                {selectedMarkerInfo.professionals.map((professional, index) => (
                  <li key={index}>
                    <button
                      className={selectedProfessional === professional ? style.active : style.greenButton}
                      onClick={() => handleProfessionalClick(professional)}
                      style={{  borderRadius: "15px" }}
                    >
                      <img className={style.smallRoundImage} src={professional.photo} alt={professional.name} />
                      {professional.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <p>Please select a marker</p>
      )}
      <div className={style.bookinginfo}>
        {selectedProfessional && (
          <>
            <h3>{selectedProfessional.name}</h3>
            <p>{selectedProfessional.description}</p>
            {showTimeSlots && selectedProfessional && (
        <ScheduledSlots day="MON" selectedProfessional={selectedProfessional} />
      )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookingInfo;
