import React from "react";
import SearchBar from "../search/searchbar";
import ReviewLocation from "./ReviewLocation";
import styles from "../search/search.module.css";

const Search = () => {
  return (
    <div>
      <SearchBar />
      <p className={styles.search_text}> View golf courses near me </p> { }
      <ReviewLocation />
    </div>
  );
};

export default Search;
