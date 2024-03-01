// LessonsHeader.jsx
import styles from "./LessonsHeader.module.css";
import LessonsIcon from "./LessonsIcon.svg";
import Header from "../block/Header/Header"
import { Link } from "react-router-dom";
import { useState } from "react";


const LessonsHeader = ({ isPro, onToggleProUser }) => {
  const handleToggleProUser = () => {
    if (typeof onToggleProUser === 'function') {
      onToggleProUser();
    }
  };

  return (
    <div>
      <Header />
      <div>
        {/* Link to setting */}
        <Link to="/setting">
        </Link>
      </div>
    </div>
  );
};

export default LessonsHeader;
