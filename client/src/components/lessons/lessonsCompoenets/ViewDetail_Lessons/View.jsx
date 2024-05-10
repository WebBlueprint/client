import React, { useState } from "react";
import style from "./View.module.css";
import ViewPro from "./ViewPro";

import Fold from "./Fold.svg";
import Down from "./Down.svg";

const View = ({ lessonId }) => {
  // 초기값을 true로 설정하여 모든 섹션을 항상 열린 상태로 만듭니다.
  const [isVideoExpanded, setIsVideoExpanded] = useState(true);
  const [isPhotoExpanded, setIsPhotoExpanded] = useState(true);
  const [isCommentExpanded, setIsCommentExpanded] = useState(true);

  return (
    <div>
      <div className={style.cover}>
        <div>
          <ViewPro />
        </div>

        <div className={style.ReviewText}>
          {/* 항상 열려 있는 비디오 섹션 */}
          <div className={style.videoSection}>
            <img src={Down} alt="None" className={style.non} /> 비디오 
            <div className={style.leftAligned}></div>
            <div className={style.imgboxs}>
              <div className={style.imgbox} />
              <div className={style.imgbox} />
              <div className={style.imgbox} />
            </div>
          </div>

          {/* 항상 열려 있는 사진 섹션 */}
          <div className={style.photoSection}>
            <img src={Down} alt="None" className={style.non} /> 사진
            <div className={style.leftAligned}></div>
            <div className={style.imgboxs}>
              <div className={style.imgbox} />
              <div className={style.imgbox} />
              <div className={style.imgbox} />
            </div>
          </div>

          {/* 항상 열려 있는 코멘트 섹션 */}
          <div className={style.commentSection}>
            <img src={Down} alt="None" className={style.non} />  코멘트 
           
            <div>내 코치가 쓴 내 코멘트</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
