import React, { useState, useEffect } from "react";

const LessonScheduler = () => {
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("18:00");
  const [lessonDuration, setLessonDuration] = useState(60);
  const [breakTime, setBreakTime] = useState(10);
  const [slots, setSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);

  useEffect(() => {
    generateSlots();
  }, [startTime, endTime, lessonDuration, breakTime]);

  const generateSlots = () => {
    const startHour = parseInt(startTime.split(":")[0], 10);
    const endHour = parseInt(endTime.split(":")[0], 10);
    const startMinute = parseInt(startTime.split(":")[1], 10);
    const endMinute = parseInt(endTime.split(":")[1], 10);

    const duration = lessonDuration;
    const breakDuration = breakTime;

    if (
      !isNaN(startHour) &&
      !isNaN(endHour) &&
      !isNaN(startMinute) &&
      !isNaN(endMinute) &&
      !isNaN(duration) &&
      !isNaN(breakDuration) &&
      startHour < endHour
    ) {
      const generatedSlots = [];
      let currentHour = startHour;
      let currentMinute = startMinute;

      while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
        const lessonStart = `${currentHour.toString().padStart(2, "0")}:${currentMinute
          .toString()
          .padStart(2, "0")}`;

        // Calculate lesson end time
        let lessonEndHour = currentHour;
        let lessonEndMinute = currentMinute + duration;

        // Correct for minute overflow
        while (lessonEndMinute >= 60) {
          lessonEndMinute -= 60;
          lessonEndHour += 1;
        }

        const lessonEnd = `${lessonEndHour.toString().padStart(2, "0")}:${lessonEndMinute
          .toString()
          .padStart(2, "0")}`;

        // Add lesson slot
        generatedSlots.push({
          start: lessonStart,
          end: lessonEnd,
        });

        // Move to the next lesson slot
        currentHour = lessonEndHour;
        currentMinute = lessonEndMinute;

        // Add break slot
        if (breakDuration > 0) {
          currentMinute += breakDuration;

          // Correct for minute overflow
          while (currentMinute >= 60) {
            currentMinute -= 60;
            currentHour += 1;
          }

          // Check if the break slot is within the lesson end time
          if (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
            const breakStart = `${currentHour.toString().padStart(2, "0")}:${currentMinute
              .toString()
              .padStart(2, "0")}`;

            // Calculate break end time
            let breakEndHour = currentHour;
            let breakEndMinute = currentMinute + breakDuration;

            // Correct for minute overflow
            while (breakEndMinute >= 60) {
              breakEndMinute -= 60;
              breakEndHour += 1;
            }

            const breakEnd = `${breakEndHour.toString().padStart(2, "0")}:${breakEndMinute
              .toString()
              .padStart(2, "0")}`;

            generatedSlots.push({
              start: breakStart,
              end: breakEnd,
            });
          }
        }

        // Move to the next lesson slot
        currentMinute += duration;
      }

      setSlots(generatedSlots);
    } else {
      setSlots([]);
    }
  };

  const handleSlotClick = (time) => {
    const isSelected = selectedSlots.some(
      (slot) => slot.start === time.start && slot.end === time.end
    );

    if (isSelected) {
      setSelectedSlots(
        selectedSlots.filter(
          (selectedTime) => selectedTime.start !== time.start && selectedTime.end !== time.end
        )
      );
    } else {
      setSelectedSlots([...selectedSlots, time]);
    }
  };

  return (
    <div>
      <div>
        <label>Start Time: </label>
        <input type="time" step="600" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      </div>
      <div>
        <label>End Time: </label>
        <input type="time" step="600" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      </div>
      <div>
        <label>Lesson Duration (minutes): </label>
        <input
          type="number"
          step="10"
          value={lessonDuration}
          onChange={(e) =>
            setLessonDuration(Math.min(300, Math.max(10, parseInt(e.target.value, 10))))
          }
        />
      </div>
      <div>
        <label>Break Time (minutes): </label>
        <input
          type="number"
          step="10"
          value={breakTime}
          onChange={(e) => setBreakTime(Math.max(0, parseInt(e.target.value, 10)))}
        />
      </div>

      <div>
        <h4>Available Time Slots</h4>
        {slots.map((time) => (
          <button
            key={`${time.start}-${time.end}`}
            onClick={() => handleSlotClick(time)}
            style={{
              backgroundColor: selectedSlots.some(
                (slot) => slot.start === time.start && slot.end === time.end
              )
                ? "green"
                : "gray",
            }}
          >
            {`${time.start} - ${time.end}`}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LessonScheduler;
