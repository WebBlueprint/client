import styles from "./ListData.module.css";
import Fold from "./Fold.svg";
import Down from "./Down.svg";
import { useState } from "react";

const MyList = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div className={styles.iconwrap}></div>

      <div>
        <br />
        <div>
          <div>
            <div className={styles.text} onClick={toggleExpand}>
              <img
                src={isExpanded ? Down : Fold}
                alt="None"
                className={styles.non}
              />
              <div div className={styles.leftAligned}>
                날짜 <br />
                시간
              </div>
            </div>
          </div>

          {isExpanded && <button> view details </button>}
        </div>
      </div>
    </div>
  );
};

export default MyList;
