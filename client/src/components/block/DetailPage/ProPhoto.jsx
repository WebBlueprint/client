import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Detail.module.css";
import proboxData from "./ProDetail.json";

const ProPhoto = () => {
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
  const selectedPro = proboxData.find(item => item.Proid === 1);

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {selectedPro.Photos.map((photo, index) => (
          <div key={index} className={styles.photos}>
            <div className={styles.photoWrapper}>
              <img src={photo} alt={`Photo ${index + 1}`} className={styles.photo} style={{ height: "350px" }} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProPhoto;
