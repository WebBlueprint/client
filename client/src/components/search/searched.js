import React, { useState } from "react";
import SearchBar from "./searchbar";
import styles from "../search/search.module.css";
import SearchCourse from "./searchCourse";
import SearchPro from "./searchPro";

function Searched() {
  const [selectedOption, setSelectedOption] = useState("course");

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

  return (
    <>
      <div className={styles.verticalLayout}>
        <SearchBar className={styles.verticalLayout} />
        <div style={optionStyle1} onClick={() => setSelectedOption("course")}>
          View golf Course near me
        </div>
        <div style={optionStyle2} onClick={() => setSelectedOption("pro")}>
          View golf Pro near me
        </div>
      </div>
      {selectedOption === "course" && <SearchCourse />}
      {selectedOption === "pro" && <SearchPro />}
    </>
  );
}

export default Searched;
