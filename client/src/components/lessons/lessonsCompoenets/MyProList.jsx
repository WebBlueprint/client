import React, { useState, useEffect } from "react";
import axios from "axios";

const MyProList = () => {
  const [data, setData] = useState([]);
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

  return (
    <div>
      {Array.isArray(data) && data.length > 0 ? (
        data.map((pro, index) => (
          <div key={`pro-${index}-${pro.user_id}`}>
            <div>
              <span>{pro.proName}</span>
              <div>{pro.proDetailGolfCourse}</div>
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
