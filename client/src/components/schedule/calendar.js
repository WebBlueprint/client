import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import "./calendar.css";

function Calendars() {
  const [appointmentDate, setAppointmentDate] = useState (["Fri Nov 24 2023", "Sat Nov 25 2023"])//날짜양식 꼭 맞출것
  const [value, onChange] = useState(new Date());
  const contentHandler = ({ activeStartDate, date, view }) => {
    const isDate =  "Sat Nov 25 2023" === (new Date(date)).toDateString()
    {console.log((new Date(date)).toDateString())}
    return view === 'month' && isDate ? <p style={{color:"red"}}>o</p> : null;
  };
  const contentHandler2 = ({ activeStartDate, date, view }) => console.log(date, view)
  const [event, setEvent] = useState()
  return (
    <>
      <Calendar
        onChange={onChange}
        value={value}
        className="calendar"
        locale="en"
        tileContent={contentHandler}
      />
    </>
  );
}


export default Calendars;
