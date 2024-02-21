import React, { useState, useEffect } from "react";
import SearchBar from "./searchbar";
import styles from "../search/search.module.css";
import SearchCourse from "./searchCourse";
import SearchPro from "./searchPro";
import axios from "axios";


function Searched() {
  const [selectedOption, setSelectedOption] = useState("course");
  const [locationName, setLocationName] = useState(""); // 추가: 받아온 name을 저장할 상태

  const optionStyle1 = {
    color: selectedOption === "course" ? "#1B4607" : "#000000",
    textDecoration: selectedOption === "course" ? "underline" : "none",
    marginTop: "-220px",
    marginLeft: "430px",
    cursor: "pointer",
    fontWeight: "bold"
  };
  const optionStyle2 = {
    color: selectedOption === "pro" ? "#1B4607" : "#000000",
    textDecoration: selectedOption === "pro" ? "underline" : "none",
    marginTop: "-22px",
    marginLeft: "710px",
    cursor: "pointer",
    fontWeight: "bold"
  };

  useEffect(() => {
    const searchResult = async () => {
      try {
        const response = await axios.get(
          "https://p-match-ec61fc56d612.herokuapp.com/search/?searchQuery=green",
          {},
          { withCredentials: true }
        );
        // 받아온 데이터의 name을 상태에 저장
        setLocationName(response.data[0]?.name || ""); // 예시로 첫 번째 데이터의 name을 가져옴
        console.log("검색어 테스트", response.data);
      } catch (error) {
        console.error("검색어 테스트", error);
      }
    };
    searchResult();
  }, []);

  return (
    <>
      <div className={styles.verticalLayout}>
        <SearchBar className={styles.verticalLayout} />
        <div style={optionStyle1} onClick={() => setSelectedOption("course")}>
          View golf Course near me
        </div>
        <div style={optionStyle2} onClick={() => setSelectedOption("pro")}>
          View Pro near me
        </div>
      </div>
      {selectedOption === "course" && <SearchCourse locationName={locationName} />}
      {selectedOption === "pro" && <SearchPro locationName={locationName} />}
    </>
  );
}

export default Searched;
