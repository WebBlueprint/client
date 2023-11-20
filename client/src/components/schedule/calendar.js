import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import "./calendar.css";
import styled, { css } from "styled-components";
import Modal from "react-modal";

function Calendars(props) {
  const [appointmentDate, setAppointmentDate] = useState(
    props.reservations.map((a) => a.reservation_date)//날짜양식 꼭 맞출것 ex) Wed 08 Nov 2023
  )
  const [value, onChange] = useState(new Date());

  const contentHandler = ({ activeStartDate, date, view }) => {
    const currentDate = new Date(date).toDateString();
    const isDate = props.reservations.some((a) => a.reservation_date === currentDate)//map은 true를 반환해도 계속 돌기에 some을 사용하여 true에서 멈추는 로직 사용
    return view === 'month' && isDate ? <AppointmentDate /> : null;
  };

  const [isOpen, setIsOpen] = useState(false);

  // 윤철아 여기 고쳐야함
  // useEffect(() => {
  //   return isOpen
  // }, [value])

  const [clickedDate, setClickedDate] = useState('')
  const clickHandler = (value, event) => {
    setClickedDate(new Date(value).toDateString())
    const currentDate = new Date(value).toDateString();
    const isDate = appointmentDate.some((a) => a === currentDate)
    if (isDate) {
      if (isOpen === false) {
        setIsOpen(() => !isOpen);
      }
    } else {
      setIsOpen(false)
    }
  };


  return (
    <>
      <Calendar
        onChange={onChange}
        value={value}
        className="calendar"
        locale="en"
        tileContent={contentHandler}
        onClickDay={clickHandler}
      />
      <Modal
        appElement={document.getElementById('root')}
        isOpen={isOpen}
        style={modalStyles}
      >
        <h2>Appointment Details</h2>
        <h4>{props.reservations.find((a) =>
          a.reservation_date === clickedDate)?.reservation_date
        }</h4>
        <h4>{props.reservations.find((a) =>
          a.reservation_date === clickedDate)?.reservation_time
        }</h4>
        <h4>{props.reservations.find((a) =>
          a.reservation_date === clickedDate)?.reservation_place
        }</h4>
        <h4>{props.reservations.find((a) =>
          a.reservation_date === clickedDate)?.pro_id
        }</h4>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </Modal>
    </>
  );
}


export default Calendars;

const AppointmentDate = styled.div`
display:flex;
width: 0.6rem;
height: 0.6rem;
background-color: #1B4607;
margin: 0 auto;
border-radius: 50%;
`

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};