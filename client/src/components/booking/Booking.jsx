import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import BookingPro from "./BookingPro";

const Booking = () => {
  const [pro, Setpro] = useState([
    {
      name: "Yuncheol Kim",
      place: "KL-KL Park",
      availableDay: ["Monday", "Tuesday", "Wednesday"],
      availableTime: ["08:00", "09:00", "10:00", "14:00"],
    },
    {
      name: "Michael Lee",
      place: "AUCKLAND Park",
      availableDay: ["Monday", "Tuesday"],
      availableTime: ["08:00", "10:00", "14:00", "18:00"],
    },
  ]);
  // console.log(pro);
  return (
    <>
      {pro.map((a, b) => {
        return (
          <Board>
            <BookingPro
              key={b}
              place={a.place}
              proName={a.name}
              availableDay={a.availableDay}
              availableTime={a.availableTime}
              pro={a}
            />
          </Board>
        );
      })}
    </>
  );
};

export default Booking;

const Board = styled.div`
  margin-top: 10rem;
  width: 25rem;
  height: 15rem;
  border: solid 2px red;
`;
