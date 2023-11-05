import styles from "./SettingHeader.module.css";
import SettingIcon from "./SettingIcon.svg";

const SettingHeader = () => {
    return (
        <div>
            <div className={styles.cover}>
                <div className={styles.maintext}>
                    <div className={styles.round}>img</div>
                    <div className={styles.text}>
                        {" "}
                        <span>Hello, Mr.Lee</span>{" "}
                    </div>
                </div>

                <div className={styles.sidetext}>
                    <div> Location : KL </div>
                    <div> Gender : M </div>
                </div>

                <div>
                    {" "}
                    <img src={SettingIcon} className={styles.imgicon} alt="" />{" "}
                </div>
            </div>
        </div>
    );
};

export default SettingHeader;
