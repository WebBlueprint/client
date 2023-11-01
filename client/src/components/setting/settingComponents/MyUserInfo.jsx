import React from "react";
import { ReactComponent as Edit } from "./Edit.svg";
import styles from "./MyUserInfo.module.css";
import Input from "./UserInfoInput";

const MyUserInfo = () => {
  return (
    <div>
      <div> Edit My UserInfo </div>
      <div className={styles.editbox}>
        <div className={styles.round}> </div>{" "}
        <Edit className={styles.editpen} />{" "}
      </div>
      <div>
        <Input />
      </div>
    </div>
  );
};

export default MyUserInfo;
