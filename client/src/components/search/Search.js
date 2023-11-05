import React from "react";
import SearchBar from "./searchbar";
import ReviewLocation from "./ReviewLocation";
import styles from "./search.module.css"; // search.module.css 파일을 import합니다.

const Search = () => {
  return (
    <div>
      <SearchBar />
      <p className={styles.search_text}> View golf courses near me </p> {}
      <ReviewLocation />
    </div>
  );
};

export default Search;
