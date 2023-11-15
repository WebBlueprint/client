import React, { useState } from "react";
import style from "./View.module.css";
import ViewPro from "./ViewPro";

import Fold from "./Fold.svg";
import Down from "./Down.svg";

const View = ({ lessonId }) => {
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const [isPhotoExpanded, setIsPhotoExpanded] = useState(false);
  const [isCommentExpanded, setIsCommentExpanded] = useState(false);

  const toggleVideoExpand = () => {
    setIsVideoExpanded(!isVideoExpanded);
  };

  const togglePhotoExpand = () => {
    setIsPhotoExpanded(!isPhotoExpanded);
  };

  const toggleCommentExpand = () => {
    setIsCommentExpanded(!isCommentExpanded);
  };

  return (
    <div>
      <div className={style.cover}>
        <div>
          <ViewPro />
        </div>

        <div className={style.ReviewText}>
          <div className={style.videoSection}>
            <div className={style.text} onClick={toggleVideoExpand}>
              <img
                src={isVideoExpanded ? Down : Fold}
                alt="None"
                className={style.non}
              />
              <div className={style.leftAligned}>
                비디오
              </div>
            </div>

            {isVideoExpanded &&<div  className={style.imgboxs}> <div className={style.imgbox} />  <div className={style.imgbox} /> <div className={style.imgbox} /> </div>}
          </div>

          <div className={style.photoSection}>
            <div className={style.text} onClick={togglePhotoExpand}>
              <img
                src={isPhotoExpanded ? Down : Fold}
                alt="None"
                className={style.non}
              />
              <div className={style.leftAligned}>
                사진
              </div>
            </div>

            {isPhotoExpanded && <div  className={style.imgboxs}> <div className={style.imgbox} />  <div className={style.imgbox} /> <div className={style.imgbox} /> </div>}
          </div>

          <div className={style.commentSection}>
            <div className={style.text} onClick={toggleCommentExpand}>
              <img
                src={isCommentExpanded ? Down : Fold}
                alt="None"
                className={style.non}
              />
              <div className={style.leftAligned}>
                코멘트
              </div>
            </div>

            {isCommentExpanded && <div>내 코치가 쓴 내 코멘트</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;