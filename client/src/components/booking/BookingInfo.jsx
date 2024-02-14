import React from "react";
import style from "./BookingMain.module.css";

const BookingInfo = ({ selectedMarkerInfo }) => {
  return (
    <div className={style.main}>
      <div className={style.row}>
        <div className={style.courseinfo}>
          {selectedMarkerInfo && (
            <>
              <h3>{selectedMarkerInfo.name}</h3>
              <p>{selectedMarkerInfo.description}</p>
            </>
          )}
        </div>
        <div className={style.proinfo}>
          {selectedMarkerInfo && selectedMarkerInfo.professionals && (
            <ul>
              {selectedMarkerInfo.professionals.map((professional, index) => (
                <li key={index}>{professional.name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className={style.bookinginfo}>예약 정보</div>
    </div>
  );
};

export default BookingInfo;
