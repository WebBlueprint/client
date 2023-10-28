import React from "react";
import styles from "./Side.module.css";
import menu1 from "./menu1.svg";
import menu2 from "./menu2.svg";

export default function Side({ onTabClick }) {
    return (
        <div>
            <div className={styles.cover} onClick={() => onTabClick("myList")}>
                <div>
                    <img src={menu1} alt="Menu 1" />
                </div>
                <div>My List</div>
            </div>

            <div className={styles.cover} onClick={() => onTabClick("myLessons")}>
                <div>
                    <img src={menu2} alt="Menu 2" />
                </div>
                <div>My Lessons</div>
            </div>
        </div>
    );
}
