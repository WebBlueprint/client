import React, { useState, useEffect } from "react";
import axios from "axios";

const MyProList = () => {
  const [data, setData] = useState([]);
  const user_Id = "user1";

  useEffect(() => {
    const fetchProsForUser = async () => {
      try {
        const response = await axios.get(
          `https://p-match-ec61fc56d612.herokuapp.com/lesson/my-pro-list/${user_Id}`,
          { withCredentials: true }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching professional list:", error);
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
              <span>{pro.user_id}</span>
              <div>{pro.email}</div>
              <div>{pro.gender}</div>
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
