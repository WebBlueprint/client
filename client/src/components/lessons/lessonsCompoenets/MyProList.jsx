import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MyProList.module.css";
import heart from "./CHeart.svg";
import Eheart from "./EHeart.svg";

const MyProList = () => {
  const [data, setData] = useState([]);
  const user_Id = "user1";
  const [selectedPros, setSelectedPros] = useState([]);
  const [showDetails, setShowDetails] = useState([]);
  const [heartState, setHeartState] = useState({});

  useEffect(() => {
    const fetchProsForUser = async () => {
      try {
        const response = await axios.get(
          `https://p-match-ec61fc56d612.herokuapp.com/lesson/my-pro-list/${user_Id}`
        );
        setData(response.data);

        // Initialize selectedPros and showDetails arrays
        setSelectedPros(new Array(response.data.length).fill(false));
        setShowDetails(new Array(response.data.length).fill(false));

        // Initialize heartState based on data
        const initialHeartState = {};
        response.data.forEach((pro) => {
          initialHeartState[pro.proName] = false;
        });
        setHeartState(initialHeartState);
      } catch (error) {
        console.error("Error during request:", error);
        console.error("Error response data:", error.response?.data);
      }
    };

    fetchProsForUser();
  }, [user_Id]);

  const handleProClick = (index) => {
    setSelectedPros((prevSelectedPros) => {
      const newSelectedPros = [...prevSelectedPros];
      newSelectedPros[index] = !newSelectedPros[index];
      return newSelectedPros;
    });
    setShowDetails((prevShowDetails) => {
      const newShowDetails = [...prevShowDetails];
      newShowDetails[index] = false;
      return newShowDetails;
    });
  };

  const handleDetailsClick = (index) => {
    setShowDetails((prevShowDetails) => {
      const newShowDetails = [...prevShowDetails];
      newShowDetails[index] = !newShowDetails[index];
      return newShowDetails;
    });
    setSelectedPros((prevSelectedPros) => {
      const newSelectedPros = [...prevSelectedPros];
      newSelectedPros[index] = false;
      return newSelectedPros;
    });
  };

  const handleHeartClick = (proName) => {
    setHeartState((prevHeartState) => {
      const newHeartState = {
        ...prevHeartState,
        [proName]: !prevHeartState[proName],
      };

      // Save newHeartState to console with pro name
      console.log("Heart State:", newHeartState);

      sessionStorage.setItem("heartState", JSON.stringify(newHeartState));

      return newHeartState;
    });
  };

  return (
    <div>
      {Array.isArray(data) && data.length > 0 ? (
        data.map((pro, index) => (
          <div key={`pro-${index}-${pro.user_id}`} className={styles.proboxs}>
            <div  className={styles.protextbox}>
              <span>{pro.proName}</span>
              <div className={styles.golfboxtext}>{pro.golfCourseName}</div>
            </div>
            <img
              src={heartState[pro.proName] ? heart : Eheart}
              alt="heart"
              onClick={() => handleHeartClick(pro.proName)}
            />
            <button> Chat Now </button>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MyProList;
