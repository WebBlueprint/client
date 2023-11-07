import React, { useState } from "react";
import styles from "./Setting.module.css"; // 스타일 모듈을 임포트

const Setting = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleConfirmClick = () => {
    // 여기에서 비밀번호 확인 로직을 구현하세요
    if (
      currentPassword === "현재_비밀번호" &&
      newPassword === confirmPassword
    ) {
      alert("비밀번호가 변경되었습니다.");
    } else {
      alert("비밀번호를 확인하세요.");
    }
  };
  1;
  return (
    <div className={styles.userinfocontainer}>
      <div className={styles.grid}>
        <div>
          {" "}
          <label htmlFor="current-password">Current Password:</label>{" "}
        </div>
        <div>
          {" "}
          <input
            type="password"
            id="current-password"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
          />{" "}
        </div>
      </div>
      <div className={styles.grid}>
        <div>
          {" "}
          <label htmlFor="new-password">New Password:</label>{" "}
        </div>
        <div>
          {" "}
          <input
            type="password"
            id="new-password"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
        </div>{" "}
      </div>
      <div className={styles.grid}>
        <div>
          {" "}
          <label htmlFor="confirm-password">Confirm Password:</label>{" "}
        </div>
        <div>
          {" "}
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />{" "}
        </div>
      </div>
      <div className={styles.update}>
        <button onClick={handleConfirmClick}>Save</button>
      </div>
    </div>
  );
};

export default Setting;
