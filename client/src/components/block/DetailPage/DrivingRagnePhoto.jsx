import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Detail.module.css";
import DrivingRangeDetail from "./DrivingRangeDetail.json";

const DrivingRangePhoto = ({ rangeId }) => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "10px", // 간격을 10px로 설정
        variableWidth: true
    };

    // 선택된 제품의 사진 배열
    const selectedRange = DrivingRangeDetail.find(data => data.range_id === rangeId);
    // 여기서 range_id === 1 했지만, 상위컴포넌트에서 번호 가지고 내려와야함

    return (
        <div className="slider-container">
            <Slider {...settings}>
                {selectedRange.photos.map((photo, index) => (
                    <div key={index} className={styles.photos}>
                        <div className={styles.photoWrapper}>
                            <img src={photo} alt={`${index + 1}`} className={styles.photo} style={{ height: "350px" }} />
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default DrivingRangePhoto;
