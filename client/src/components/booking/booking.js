import React, { useRef, useState } from "react";
import LessonHeader from "../block/Header/Header";
import styles from "../booking/booking.module.css";
import MyPro from "../booking/MyPro";
import Schedule from "../booking/Schedule";


const proData = [
  { name: "김민지 프로", lesson: "(10/20)" },
  { name: "김윤철 프로", lesson: "(8/20)" },
  { name: "김동현 프로", lesson: "(8/20)" },
  { name: "윤승우 프로", lesson: "(8/20)" },
  { name: "이현경 프로", lesson: "(8/20)" }
];


function Booking() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [startIndex, setStartIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);

  const onItemClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const scrollLeft = () => {
    if (startIndex > 0) {
      setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      setActiveIndex(null);
    }
  };

  const scrollRight = () => {
    if (startIndex < proData.length - 3) {
      setStartIndex((prevIndex) => Math.min(prevIndex + 1, proData.length - 3));
      setActiveIndex(null);
    }
  };

  return (
    <>
      <div className={styles.lessonContainer}>
        <LessonHeader />
      </div>
      <p className={styles.upcomingt}> My Upcoming Lessons </p> {}
      <div className={styles.cover2}>
        <p className={styles.viewprot}> View All My Pro </p>
        <div className={styles.iconContainer}>
          <div className={styles.iconWrapper} onClick={scrollLeft}>
            <i className="fa fa-chevron-left"></i>
          </div>
          <div className={styles.iconWrapper2} onClick={scrollRight}>
            <i className="fa fa-chevron-right"></i>
          </div>
          <div className={styles.wrapper} ref={wrapperRef}>
            <div className={styles.proCover} ref={containerRef}>
              {proData.slice(startIndex, startIndex + 3).map((pro, index) => (
                <MyPro
                  key={index}
                  name={pro.name}
                  lesson={pro.lesson}
                  onItemClick={() => onItemClick(index)}
                  isActive={index === activeIndex}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className={styles.booklessont}> Book for Next Lessons </p>
      <Schedule />
    </>
  );
}

export default Booking;
