import React, { useState, useEffect } from "react";
import axios from "axios";
import heart from "./EHeart.svg"; // Import the empty heart SVG
import filledHeart from "./CHeart.svg"; // Import the filled heart SVG

const MyProList = () => {
  const [data, setData] = useState([]);
  const [heartState, setHeartState] = useState({}); // State to track heart clicks

  const user_Id = "user1";

  useEffect(() => {
    const fetchProsForUser = async () => {
      try {
        const response = await axios.get(
          `https://p-match-ec61fc56d612.herokuapp.com/lesson/my-pro-list/user1`
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error during request:", error);
        console.error("Error response data:", error.response?.data);
      }
    };

    fetchProsForUser();
  }, []);

  // Function to handle heart click
  const handleHeartClick = (proId, proName) => {
    // Create a new object from the current state
    const newHeartState = { ...heartState };

    // Toggle heart state (1 for clicked, 0 for not clicked)
    newHeartState[proId] = newHeartState[proId] ? 0 : 1;

    // Update the state
    setHeartState(newHeartState);

    // Log to console
    console.log(`Heart clicked for ${proName} with ID ${proId}`);

    // Save to sessionStorage
    sessionStorage.setItem("heartState", JSON.stringify(newHeartState));
  };

  return (
    <div>
      {Array.isArray(data) && data.length > 0 ? (
        data.map((pro, index) => (
          <div key={`pro-${index}-${pro.user_id}`}>
            <div>
              <span>{pro.proName}</span>
              <div>{pro.proDetailGolfCourse}</div>

                {heartState[pro.user_id] ? (
                  <img src={filledHeart} alt="Filled Heart" />
                ) : (
                  <img src={heart} alt="Empty Heart" />
                )}

            </div>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default MyProList;
