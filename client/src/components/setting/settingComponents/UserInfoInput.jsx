import React, { useState } from "react";
import Select from "react-select";

import styles from "./Setting.module.css"; // UserInfo 모듈의 스타일을 임포트

const UserInfoInput = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    locations: []
  });

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [locationError, setLocationError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    // 이메일 유효성 검사
    const isValidEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
      email
    );

    if (isValidEmail) {
      setEmailError("");
    } else {
      setEmailError("유효하지 않은 이메일입니다.");
    }

    setFormData({ ...formData, email });
  };

  const handlePhoneChange = (e) => {
    const phone = e.target.value;
    // 숫자만 허용
    const cleanPhone = phone.replace(/\D/g, "");

    setPhoneError("");
    setFormData({ ...formData, phone: cleanPhone });
  };

  const handleLocationChange = (selectedOptions) => {
    const selectedLocations = selectedOptions.map((option) => option.value);
    setFormData({ ...formData, locations: selectedLocations });
    setLocationError(""); // 위치 에러 메시지 제거
  };

  const removeLocation = (location) => {
    const updatedLocations = formData.locations.filter(
      (loc) => loc !== location
    );
    setFormData({ ...formData, locations: updatedLocations });
  };

  const options = [
    { value: "Location 1", label: "Location 1" },
    { value: "Location 2", label: "Location 2" },
    { value: "Location 3", label: "Location 3" },
    { value: "Location 4", label: "Location 4" }
  ];

  return (
    <div className={styles.cover}>
      <div className={styles.grid}>
        <div>
          <label>First Name:</label>
        </div>
        <div>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleEmailChange}
          />
          <span style={{ color: "red" }}>{emailError}</span>
        </div>
        <div>
          <label>Phone:</label>
        </div>
        <div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
          />
          <span style={{ color: "red" }}>{phoneError}</span>
        </div>
        <div>
          <label>Locations:</label>
        </div>
        <div>
          <Select
            name="locations"
            isMulti
            value={options.filter((option) =>
              formData.locations.includes(option.value)
            )}
            options={options}
            onChange={handleLocationChange}
            className={styles.selectbox}
          />
        </div>
      </div>
    </div>
  );
};

export default UserInfoInput;
