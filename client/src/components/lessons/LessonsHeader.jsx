import styles from "./LessonsHeader.module.css";
import LessonsIcon from "./LessonsIcon.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

const LessonsHeader = () => {
  // pro 상태를 추적하는 state 추가
  const [isPro, setIsPro] = useState(true); // pro 여부에 따라 초기값 설정

  const handleToggleProUser = () => {
    setIsPro((prevIsPro) => !prevIsPro);
  };

  return (
    <div>
      <div className={styles.cover}>
        <div className={styles.maintext}>
          <div className={`${styles.round} ${isPro ? styles.pro : ''}`}>img</div>
          <div className={styles.text}>
            {" "}
            <span>Hello, Mr.Lee {isPro && <span className={styles.proText}>Pro</span>}</span>{" "}
          </div>
        </div>

        <div className={styles.sidetext}>
          <div> Location : KL </div>
          <div> Gender : M </div>
        </div>

        <div>
          {/* Toggle button */}
          <button onClick={handleToggleProUser}>
            Toggle Pro/User
          </button>

          {/* Link to setting */}
          <Link to="/setting">
            <img src={LessonsIcon} className={styles.imgicon} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LessonsHeader;
