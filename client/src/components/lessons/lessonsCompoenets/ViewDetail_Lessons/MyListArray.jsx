import React from "react";
import fold from "./fold.svg";
import Down from "./Down.svg";
import { useState } from "react";
import styles from "./MyListArray.module.css";
const MyListArray = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div>
        <div className={styles.iconwrap}></div>

        <div>
          <br />
          <div>
            <div>
              <div className={styles.text} onClick={toggleExpand}>
                <img
                  src={isExpanded ? Down : fold}
                  alt="None"
                  className={styles.non}
                />
                <div div className={styles.leftAligned}>
                  2023.00.00 <br />
                  +82 00 000 0000
                </div>
              </div>
            </div>

            {isExpanded && <button> view details </button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyListArray;
