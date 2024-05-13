import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Calendar from "react-calendar";
import "../SettingCompoenets/calendar.css";
import Modal from "react-modal";
import Timetable from "./TimeTable";
Modal.setAppElement("#root");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const BookingPro = (props) => {
  let subtitle;
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setModalIsOpen(false);
  }
  const [value, onChange] = useState(new Date());

  return (
    <>
      <div>Pro name : {props.proName}</div>
      <div>Pro place : {props.place}</div>
      <Box>
        <div>
          {String(value).split(/\d{2}:/)[0] ==
          String(new Date()).split(/\d{2}:/)[0] ? (
            <CalendarButton onClick={openModal}>Choose Date</CalendarButton>
          ) : (
            <button onClick={openModal}>
              {String(value).split(/\d{2}:/)[0]}
            </button>
          )}

          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
              Choose your available day
            </h2>
            <button onClick={closeModal}>close</button>
            <Calendar
              onClickDay={closeModal}
              onChange={onChange}
              value={value}
            />
          </Modal>
          {console.log(String(value).split(/\d{2}:/))}
        </div>
      </Box>
      <Timetable value={value}></Timetable>
    </>
  );
};

export default BookingPro;

const Box = styled.div`
  display: flex;
`;

const SubmitButton = styled.button``;

const CalendarButton = styled.button``;

const AvailableTime = styled.select``;
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import Select from "react-select";

// const Myslot = () => {
//   const defaultFormData = {
//     selectedDays: [],
//     startTime: "09:00",
//     endTime: "18:00",
//     lessonTime: "",
//     reservedTimes: [],
//     selectedGolfCourses: []
//   };

//   const [formData, setFormData] = useState(() => {
//     const savedFormData = localStorage.getItem("formData");
//     return savedFormData ? JSON.parse(savedFormData) : defaultFormData;
//   });
//   const [showModal, setShowModal] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [missingFields, setMissingFields] = useState([]);

//   const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//   const options = [
//     { value: "Location 1", label: "Location 1" },
//     { value: "Location 2", label: "Location 2" },
//     { value: "Location 3", label: "Location 3" },
//     { value: "Location 4", label: "Location 4" }
//   ];

//   const handleSubmit = () => {
//     const missing = [];
//     if (formData.selectedDays.length === 0) {
//       missing.push("Available Slot");
//     }
//     if (!formData.startTime) {
//       missing.push("Start Time");
//     }
//     if (!formData.endTime) {
//       missing.push("End Time");
//     }
//     if (formData.lessonTime === "") {
//       missing.push("Lesson Time");
//     }
//     if (formData.selectedGolfCourses.length === 0) {
//       missing.push("Golf Course");
//     }
//     if (formData.reservedTimes.length === 0 && formData.lessonTime !== "") {
//       missing.push("Lesson Time");
//     }

//     if (missing.length > 0) {
//       setMissingFields(missing);
//       setErrorMessage(`Please fill in all required fields: ${missing.join(', ')}`);
//       setShowModal(true);
//       return;
//     }

//     setErrorMessage(""); // Clear error message
//     const submittedFormData = {
//       ...formData,
//       dateSubmitted: new Date().toLocaleString()
//     };
//     localStorage.setItem("formData", JSON.stringify(submittedFormData));
//     setShowModal(true);
//     setFormData(defaultFormData);
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//     setErrorMessage("");
//     setMissingFields([]);
//   };

//   const handleDayClick = (day) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       selectedDays: prevData.selectedDays.includes(day)
//         ? prevData.selectedDays.filter((selectedDay) => selectedDay !== day)
//         : [...prevData.selectedDays, day]
//     }));
//   };

//   const handleStartTimeChange = (event) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       startTime: event.target.value
//     }));
//   };

//   const handleEndTimeChange = (event) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       endTime: event.target.value
//     }));
//   };

//   const handleLessonTimeChange = (event) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       lessonTime: event.target.value
//     }));
//   };

//   const handleReservation = (time) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       reservedTimes: prevData.reservedTimes.includes(time)
//         ? prevData.reservedTimes.filter((reservedTime) => reservedTime !== time)
//         : [...prevData.reservedTimes, time]
//     }));
//   };

//   const handleLocationChange = (selectedOptions) => {
//     const selectedValues = selectedOptions.map((option) => option.value);
//     setFormData((prevData) => ({
//       ...prevData,
//       selectedGolfCourses: selectedValues
//     }));
//   };

//   useEffect(() => {
//     localStorage.setItem("formData", JSON.stringify(formData));
//   }, [formData]);

//   const calculateAvailableTimes = () => {
//     const availableTimes = [];
//     if (!formData.lessonTime) return availableTimes; // Lesson Time이 입력되지 않은 경우 빈 배열 반환

//     let currentTime = new Date(`2000-01-01T${formData.startTime}`);
//     const endTimeObj = new Date(`2000-01-01T${formData.endTime}`);

//     while (currentTime < endTimeObj) {
//       availableTimes.push(
//         currentTime.toLocaleTimeString("en-US", {
//           hour: "2-digit",
//           minute: "2-digit"
//         })
//       );
//       currentTime.setMinutes(currentTime.getMinutes() + parseInt(formData.lessonTime, 10));
//     }

//     return availableTimes;
//   };
//   const availableTimes = calculateAvailableTimes();

//   return (
//     <div>
//       <div>
//         <div>Available Slot {missingFields.includes("Available Slot") && <ErrorMessage>Input required</ErrorMessage>}</div>
//         <Container>
//           {daysOfWeek.map((day) => (
//             <Btn
//               key={day}
//               onClick={() => {
//                 handleDayClick(day);
//               }}
//               style={{ backgroundColor: formData.selectedDays.includes(day) ? "#1b4607" : ""
//             }}
//             >
//               {day}
//             </Btn>
//           ))}
//         </Container>
//       </div>

//       <div>
//         <div> Time Slot</div>
//         <BigWrap>
//           <div>
//             <div>Start Time: {missingFields.includes("Start Time") && <ErrorMessage>Input required</ErrorMessage>}</div>
//             <input type="time" value={formData.startTime} onChange={handleStartTimeChange} />
//           </div>
//           <div>
//             <div>End Time: {missingFields.includes("End Time") && <ErrorMessage>Input required</ErrorMessage>}</div>
//             <input type="time" value={formData.endTime} onChange={handleEndTimeChange} />
//           </div>
//         </BigWrap>
//         <BigWrap>
//           <div>
//             <div>Lesson Duration (minutes) </div>
//             <Selects value={formData.lessonTime} onChange={handleLessonTimeChange}>
//               {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((time) => (
//                 <option key={time} value={time}>
//                   {time} Mins
//                 </option>
//               ))}
//             </Selects>
//           </div>
//         </BigWrap>
//         <div>
//   <div> Lesson Time {missingFields.includes("Lesson Time") && availableTimes.length === 0 && <ErrorMessage>Input required</ErrorMessage>}</div>
//   <Container>
//     {availableTimes.length === 0 ? (
//       <ErrorMessage>No available times</ErrorMessage>
//     ) : (
//       availableTimes.map((time, index) => (
//         <Btn
//           key={index}
//           onClick={() => handleReservation(time)}
//           style={{
//             backgroundColor: formData.reservedTimes.includes(time) ? "#1b4607" : ""
//           }}
//         >
//           {time}
//         </Btn>
//       ))
//     )}
//   </Container>
// </div>
//       </div>

//       <div>
//         <div>Golf Course {missingFields.includes("Golf Course") && <ErrorMessage>Input required</ErrorMessage>}</div>
//         <div>
//           <Select
//             name="locations"
//             isMulti
//             value={options.filter((option) =>
//               formData.selectedGolfCourses.includes(option.value)
//             )}
//             onChange={handleLocationChange}
//             options={options}
//           />
//         </div>
//       </div>

//       <button onClick={handleSubmit}>
//         Submit
//       </button>

//       {showModal && (
//         <Modal>
//           <ModalContent>
//             <ErrorMessage>{errorMessage}</ErrorMessage>
//             {errorMessage === "" && (
//               <p>Myslot has been saved.</p>
//             )}
//             <button onClick={handleModalClose}>OK</button>
//           </ModalContent>
//         </Modal>
//       )}
//     </div>
//   );
// };

// const BigWrap = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   grid-gap: 10px;
// `;

// const Container = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   flex-direction: row;
//   align-items: center;
// `;

// const Btn = styled.div`
//   padding: 1em;
//   margin: 5px;
//   background-color: ${({ style }) => style && style.backgroundColor ? style.backgroundColor : "#dde3da"};
//   color: ${({ style }) => style && style.backgroundColor === "#1b4607" ? "#ffffff" : "#000000"};
//   text-align: center;
//   display: flex;
//   border: none;
//   border-radius: 1em;
//   height: 3em;
//   transition: background-color 0.3s;
// `;

// const Selects = styled.select`
//   padding: 1em;
//   margin: 5px;
//   background-color: #dde3da;
//   text-align: center;
//   display: flex;
//   border: none;
//   border-radius: 1em;
//   height: 3em;
//   width: 100%;
// `;

// const Modal = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const ModalContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 5px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
// `;

// const ErrorMessage = styled.span`
//   color: red;
//   margin-bottom: 10px;
//   font-size: 12px;
// `;

// export default Myslot;
