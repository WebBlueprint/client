import React, { useState } from "react";
import styles from "../search/search.module.css";
import { faSearch, faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import list from "./locationlist.json";
import { Link } from "react-router-dom";
import Dropdown from "./Citydropdown";

library.add(faLocationArrow);

const SearchBar = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    // 검색 로직을 추가할 수 있습니다.
    console.log("검색어:", searchTerm);
    // 실제로 검색을 실행하거나 다른 동작을 수행할 수 있습니다.
  };


  return (
    <div className={`${styles.search_page} ${className}`}>
      <button
        className={styles.location}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <FontAwesomeIcon
          icon={faLocationArrow}
          className={`${styles["location-icon"]} ${styles["large-icon"]}`}
        />
        <span
          className={styles["location-name"]}
          style={{ whiteSpace: "nowrap" }}
        >
          Kuala Lumpur
        </span>
      </button>
    {isOpen && (
        <div className={styles["dropdown-list"]}>
          {" "}
          {}
          {list.map((item, i) => (
            <div key={i}>
              <h3>{item.city}</h3>
            </div>
          ))}
        </div>
      )}
      <div className={styles["search-input-container"]}>
        <FontAwesomeIcon icon={faSearch} className={styles["special-icon"]} />
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search by pro name or golf course name"
          className={styles["search-input"]}
        />
      </div>
      <Link to="/searched" className={styles.Search} onClick={handleSearch}>
        Search
      </Link>

<br />
<Dropdown />
         

    </div>
  );
};

export default SearchBar;
