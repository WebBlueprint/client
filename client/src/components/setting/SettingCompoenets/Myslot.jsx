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

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const options = [
    { value: "Location 1", label: "Location 1" },
    { value: "Location 2", label: "Location 2" },
    { value: "Location 3", label: "Location 3" },
    { value: "Location 4", label: "Location 4" }
  ];

  useEffect(() => {
    console.log("Form Data:", formData);
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

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
      locations: selectedValues
    }));
  };

  const handleSubmit = () => {
    // Handle your submit logic here
  };

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
              style={{ backgroundColor: formData.selectedDays.includes(day) ? "#1b4607" : "" }}
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
              formData.locations.includes(option.value)
            )}
            onChange={handleLocationChange}
            options={options}
          />
        </div>
      </div>

      <button onClick={handleSubmit}>
        Submit
      </button>
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
  text-align: center;
  display: flex;
  border: none;
  border-radius: 1em;
  height: 3em;
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

export default Myslot;
