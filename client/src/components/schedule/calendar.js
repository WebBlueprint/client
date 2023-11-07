import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import "./calendar.css";

function Calendars() {
  const [value, onChange] = useState(new Date());
  return (
    <>
      <Calendar
        onChange={onChange}
        value={value}
        className="calendar"
        locale="en"
      />
    </>
  );
}

export default Calendars;
