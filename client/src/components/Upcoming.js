import React, { useState } from "react";

import Upcominglesson from "./Upcominglesson";

const Upcoming = () => {
  const [upcominglesson, setUpcominglesson] = useState([
    {
      proName: "김윤철",
      date: "940303",
      time: "PM 1:00",
      remainCount: "11",
    },
    {
      proName: "윤승우",
      date: "111111",
      time: "PM 2:00",
      remainCount: "15",
    },
    {
      proName: "김민지",
      date: "222222",
      time: "PM 3:00",
      remainCount: "1",
    },
    {
      proName: "이현경",
      date: "333333",
      time: "PM 4:00",
      remainCount: "9",
    },
    {
      proName: "이현경",
      date: "333333",
      time: "PM 4:00",
      remainCount: "9",
    },
  ]);
  return (
    <div style={{ display: "flex" }}>
      {upcominglesson.map((a, b) => {
        return <Upcominglesson list={a} key={b} />;
      })}
    </div>
  );
};

export default Upcoming;
