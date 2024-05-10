import React, { useState, useEffect } from "react";
import styles from "./Detail.module.css";
import proboxData from "./ProDetail.json";
import { ReactComponent as Mypro } from "./MyPro.svg";
import { ReactComponent as AddPro } from "./AddPro.svg";
import ProPhoto from "./ProPhoto";
import StarRating from "./StarRate";
import { Link } from "react-router-dom"; // Import Link component


const ProDetail = () => {
  const [selectedProId, setSelectedProId] = useState(1);
  const [selectedPro, setSelectedPro] = useState(null);
  const [activeTab, setActiveTab] = useState('Careers');
  const [likedPros, setLikedPros] = useState([]);

  useEffect(() => {
    const proInfo = proboxData.find(pro => pro.Proid === selectedProId);
    setSelectedPro(proInfo);
  }, [selectedProId]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleLikeClick = () => {
    setSelectedPro(prevPro => ({
      ...prevPro,
      Like: prevPro.Like === 1 ? 0 : 1
    }));
  };

  return (
    <div className={styles.appsin}>
      <div className={styles.cover}>
        {selectedPro && (
          <>
            <div> Pro Detail <button> <Link to="/prodetailedit">Edit</Link>  </button>  </div>
            <div className={styles.probox1}>
              <div className={styles.imagebox}>
                <img className={styles.imagethumbnail} src={selectedPro.image} alt="프로 사진" />
              </div>
              <div className={styles.probox3}>
                <div className={styles.likeButtons}>
                  <div><h3>{selectedPro.Proname}</h3></div>
                  <div className={styles.likeButton} onClick={handleLikeClick}>
                    {selectedPro.Like === 1 ? (
                      <>
                        <Mypro />
                        <span className={styles.likeButtontext}>Added</span>
                      </>
                    ) : (
                      <>
                        <AddPro />
                        <span className={styles.likeButtontext}>Add My Pro</span>
                      </>
                    )}
                  </div>
                </div>
                {/* 별점을 표시하는 StarRating 컴포넌트를 사용 */}
                <div><StarRating rating={parseFloat(selectedPro["StarAvarage"])} /></div>
                <div className={styles.hashtag}><b>{selectedPro.Hastag.map(tag => `#${tag}`).join(", ")}</b></div>
                <div className={styles.btnchat}>Chat Now</div>
              </div>
            </div>
            <div className={styles.probox2}>
              <div className={styles.tabs}>
                <div className={`${styles.tab} ${activeTab === 'Careers' ? styles.active : ''}`} onClick={() => handleTabClick('Careers')}>Careers</div>
                <div className={`${styles.tab} ${activeTab === 'Curriculum' ? styles.active : ''}`} onClick={() => handleTabClick('Curriculum')}>Curriculum</div>
                <div className={`${styles.tab} ${activeTab === 'Reviews' ? styles.active : ''}`} onClick={() => handleTabClick('Reviews')}>Reviews</div>
              </div>
              <div className={styles.tabContent}>
                {activeTab === 'Careers' && <p>{selectedPro.Careers}</p>}
                {activeTab === 'Curriculum' && <p>{selectedPro.Curriculum}</p>}
                {activeTab === 'Reviews' && (
                  <div className={styles.golfRange}>
                    {selectedPro.Reviews.map(review => (
                      <div className={styles.golfRangebox} key={review.id}>
                        <b>{review.author}</b>
                        {/* 리뷰의 별점을 StarRating 컴포넌트로 대체 */}
                        <div> <StarRating rating={review.rating} /></div>
                        <p>{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <br />
              <div className={styles.tabs}>Photos</div>
              <ProPhoto photos={selectedPro["Golf Range"].flatMap(range => range.photo)} />
              <br />
              <div>
                <div className={styles.tabs}> Golf Range</div>
                <div className={styles.golfRange}>
                  {Array.isArray(selectedPro["Golf Range"]) ? (
                    selectedPro["Golf Range"].map((range, idx) => (
                      <div key={idx} className={styles.golfRangebox}>
                        <div className={styles.rangePhotos}>
                          {/* 각 골프 범위의 첫 번째 사진만 표시 */}
                          <img src={range.photo[0]} alt={`Range Photo ${idx + 1}`} className={styles.rangePhoto} />
                        </div>
                        <b>{range.name}</b>
                        <p>{range.Address}</p>
                      </div>
                    ))
                  ) : (
                    <p>No Golf Ranges available</p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProDetail;
