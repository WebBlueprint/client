import React, { useState } from "react";
import style from "./BookingMain.module.css";

const BookingInfo = ({ selectedMarkerInfo }) => {
  const [selectedProfessional, setSelectedProfessional] = useState(null);

  const handleProfessionalClick = (professional) => {
    setSelectedProfessional(professional);
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
            <button className={style.greenButton}>예약하기</button>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingInfo;
