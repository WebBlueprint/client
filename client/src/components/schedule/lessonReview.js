import styles from "../block/UpcomingList/UpcomingList.module.css";
import { React, useEffect } from "react";
import { useState } from "react";
import ListData from "../block/UpcomingList/ListData";
import styled, { css } from "styled-components";
import axios from "axios";

const LessonReview = () => {
  const myListArray = Array(6).fill(null);

  const [data, setData] = useState([]);

  useEffect(() => {
    const popularPros = async () => {
      try {
        const response = await axios.get(
          "https://p-match-ec61fc56d612.herokuapp.com/lesson/personal-lessons/윤승우",
          {},
          { withCredentials: true }
        );
        console.log(response.data);
        setData(...data, response.data);
      } catch (error) {
        console.error("사용자 확인 중 오류 발생:", error);
      }
    };
    popularPros();
  }, []);

  return (
    <div className={styles.cover}>
      <div className={styles.iconwrap}></div>

      <div className={styles.text}>
        <Circle></Circle>
      </div>

      <div>
        <br />
        <div>
          <div>
            {myListArray.map((_, index) => (
              <ListData key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonReview;

const Circle = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: tomato;
`;
