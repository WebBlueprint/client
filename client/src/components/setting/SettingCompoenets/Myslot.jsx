import React, { useState } from "react";
import SlotTimeSpecific from "./SlotTimeSpecific";

const Myslot = () => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedPerDay, setSelectedPerDay] = useState(1);
  const [selectedGolfCourses, setSelectedGolfCourses] = useState([]);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleDayClick = (day) => {
    const isSelected = selectedDays.includes(day);

    if (isSelected) {
      setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handlePerDayChange = (value) => {
    setSelectedPerDay(value);
  };


  const handleGolfCourseSelect = (course) => {
    const isSelected = selectedGolfCourses.includes(course);

    if (isSelected) {
      setSelectedGolfCourses(selectedGolfCourses.filter((selectedCourse) => selectedCourse !== course));
    } else {
      setSelectedGolfCourses([...selectedGolfCourses, course]);
    }
  };

  return (
    <div>
      <div>
        <div>Available Slot </div>
        {daysOfWeek.map((day) => (
          <button
            key={day}
            onClick={() => {
              handleDayClick(day);
              console.log("Selected Days:", selectedDays);
            }}
            style={{ backgroundColor: selectedDays.includes(day) ? "lightblue" : "white" }}
          >
            {day}
          </button>
        ))}
      </div>

      <div>
        <div>Per Day</div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
          <button
            key={value}
            onClick={() => {
              handlePerDayChange(value);
              console.log("Selected Per Day:", selectedPerDay);
            }}
            style={{ backgroundColor: selectedPerDay === value ? "lightblue" : "white" }}
          >
            {value}
          </button>
        ))}
      </div>


      <div>
        <div>4. Time Slot</div>
        <SlotTimeSpecific />
        
      </div>

      <div>
        <div>5. Golf Course </div>
        {["Course A", "Course B", "Course C"].map((course) => (
          <button
            key={course}
            onClick={() => {
              handleGolfCourseSelect(course);
              console.log("Selected Golf Courses:", selectedGolfCourses);
            }}
            style={{ backgroundColor: selectedGolfCourses.includes(course) ? "lightblue" : "white" }}
          >
            {course}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Myslot;
