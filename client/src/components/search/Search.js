import React from "react";
import SearchBar from "../search/searchbar";
import ReviewLocation from "./ReviewLocation";
import styles from "../search/search.module.css"; 
import GolfPlaceNear from "./GolfPlaceNear";



const Search = () => {
  return (
    <div>
      <SearchBar />
      <p className={styles.search_text}> View golf courses near me </p> {}
      <GolfPlaceNear />
    </div>
  );
};

export default Search;
