import styles from "./Header.module.css";
import LessonsIcon from "./LessonsIcon.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../application/store/AuthContext.js"
import React, { useContext, useEffect, useState } from "react";


const LessonsHeader = (props) => {
  const { userinfo } = useContext(AuthContext);
  const [userEmail, setUserEmail] = useState("Guest")
  // useEffect 추가

  useEffect(() => {
    setUserEmail(userinfo.email || "Guest");
  }, [userinfo]);

  return (
    <div>
      <div className={styles.cover}>
        <div className={styles.maintext}>
          <div className={styles.round}>img</div>
          <div className={styles.text}>
            {" "}
            <span>Hello, {userEmail} </span>{" "}
          </div>
        </div>

        <div className={styles.sidetext}>
          <div> Location : KL </div>
          <div> Gender : M </div>
        </div>

        <div>
          {" "}
          <Link to="/setting">
            {" "}
            {/* 이 부분이 추가됩니다 */}
            <img src={LessonsIcon} className={styles.imgicon} />{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LessonsHeader;
