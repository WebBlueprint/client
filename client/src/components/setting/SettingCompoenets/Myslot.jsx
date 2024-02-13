import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Select from "react-select";

const Myslot = () => {
  const [formData, setFormData] = useState({
    selectedDays: [],
    startTime: "09:00",
    endTime: "18:00",
    lessonTime: 30,
    breakTime: 10,
    reservedTimes: [],
    selectedGolfCourses: [],
    locations: []
  });

  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const options = [
    { value: "Location 1", label: "Location 1" },
    { value: "Location 2", label: "Location 2" },
    { value: "Location 3", label: "Location 3" },
    { value: "Location 4", label: "Location 4" }
  ];

  const handleSubmit = () => {
    if (
      formData.selectedDays.length === 0 ||
      formData.selectedGolfCourses.length === 0
    ) {
      setErrorMessage("Please fill in all required fields.");
      setShowModal(true);
      return;
    }
  
    setErrorMessage(""); // Clear error message
    const submittedFormData = {
      ...formData,
      dateSubmitted: new Date().toLocaleString()
    };
    localStorage.setItem("Myslot", JSON.stringify(submittedFormData));
    setShowModal(true);
  };
  
  const handleModalClose = () => {
    setShowModal(false);
    setErrorMessage("");
    setFormData({
      selectedDays: [],
      startTime: "09:00",
      endTime: "18:00",
      lessonTime: 30,
      breakTime: 10,
      reservedTimes: [],
      selectedGolfCourses: [],
      locations: []
    });
  };

  const handleDayClick = (day) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedDays: prevData.selectedDays.includes(day)
        ? prevData.selectedDays.filter((selectedDay) => selectedDay !== day)
        : [...prevData.selectedDays, day]
    }));
  };

  const handleStartTimeChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      startTime: event.target.value
    }));
  };

  const handleEndTimeChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      endTime: event.target.value
    }));
  };

  const handleLessonTimeChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      lessonTime: parseInt(event.target.value, 10)
    }));
  };

  const handleBreakTimeChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      breakTime: parseInt(event.target.value, 10)
    }));
  };

  const handleReservation = (time) => {
    setFormData((prevData) => ({
      ...prevData,
      reservedTimes: prevData.reservedTimes.includes(time)
        ? prevData.reservedTimes.filter((reservedTime) => reservedTime !== time)
        : [...prevData.reservedTimes, time]
    }));
  };

  const handleLocationChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormData((prevData) => ({
      ...prevData,
      selectedGolfCourses: selectedValues
    }));
  };

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const calculateAvailableTimes = () => {
    const availableTimes = [];
    let currentTime = new Date(`2000-01-01T${formData.startTime}`);
    const endTimeObj = new Date(`2000-01-01T${formData.endTime}`);

    while (currentTime < endTimeObj) {
      availableTimes.push(
        currentTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit"
        })
      );
      currentTime.setMinutes(currentTime.getMinutes() + formData.lessonTime);
      currentTime.setMinutes(currentTime.getMinutes() + formData.breakTime);
    }

    return availableTimes;
  };
  const availableTimes = calculateAvailableTimes();

  return (
    <div>
      <div>
        <div>Available Slot </div>
        <Container>
          {daysOfWeek.map((day) => (
            <Btn
              key={day}
              onClick={() => {
                handleDayClick(day);
              }}
              style={{ backgroundColor: formData.selectedDays.includes(day) ? "#1b4607" : "" 
            }}
            >
              {day}
            </Btn>
          ))}
        </Container>
      </div>

      <div>
        <div> Time Slot</div>
        <BigWrap>
          <div>
            <div>Start Time:</div>
            <input type="time" value={formData.startTime} onChange={handleStartTimeChange} />
          </div>
          <div>
            <div>End Time:</div>
            <input type="time" value={formData.endTime} onChange={handleEndTimeChange} />
          </div>
        </BigWrap>
        <BigWrap>
          <div>
            <div>Lesson Duration (minutes):</div>
            <Selects value={formData.lessonTime} onChange={handleLessonTimeChange}>
              {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((time) => (
                <option key={time} value={time}>
                  {time} Mins
                </option>
              ))}
            </Selects>
          </div>
          <div>
            <div>Break Time (minutes):</div>
            <Selects value={formData.breakTime} onChange={handleBreakTimeChange}>
              {[5, 10, 15, 20, 30, 40, 50].map((time) => (
                <option key={time} value={time}>
                  {time} Mins
                </option>
              ))}
            </Selects>
          </div>
        </BigWrap>
        <div>
          <Container>
            {availableTimes.map((time, index) => (
              <Btn
                key={index}
                onClick={() => handleReservation(time)}
                style={{
                  backgroundColor: formData.reservedTimes.includes(time) ? "#1b4607" : ""
                }}
              >
                {time}
              </Btn>
            ))}
          </Container>
        </div>
      </div>

      <div>
        <div>Golf Course</div>
        <div>
          <Select
            name="locations"
            isMulti
            value={options.filter((option) =>
              formData.selectedGolfCourses.includes(option.value)
            )}
            onChange={handleLocationChange}
            options={options}
          />
        </div>
      </div>

      <button onClick={handleSubmit}>
        Submit
      </button>

      {showModal && (
        <Modal>
          <ModalContent>
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <p>Myslot has been saved.</p>
            <button onClick={handleModalClose}>OK</button>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

const BigWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
`;

const Btn = styled.div`
  padding: 1em;
  margin: 5px;
  background-color: #dde3da;
  color: ${props => props.style.backgroundColor === "#1b4607" ? "#ffffff" : "#000000"};
  text-align: center;
  display: flex;
  border: none;
  border-radius: 1em;
  height: 3em;
  transition: background-color 0.3s;
`;

const Selects = styled.select`
  padding: 1em;
  margin: 5px;
  background-color: #dde3da;
  text-align: center;
  display: flex;
  border: none;
  border-radius: 1em;
  height: 3em;
  width: 100%;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 10px;
`;

export default Myslot;
