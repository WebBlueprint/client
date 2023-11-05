import styles from "../block/UpcomingList/UpcomingList.module.css";
import ListData from "../block/UpcomingList/ListData";
import styled, { css } from "styled-components";

const LessonReview = () => {
  const myListArray = Array(6).fill(null);

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
