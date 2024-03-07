import React, { useState, useEffect } from "react";
import styles from "./Detail.module.css";
import proboxData from "./ProDetail.json";

const ProDetail = () => {
  const [selectedProId, setSelectedProId] = useState(1); // 기본값으로 proid 1 설정
  const [selectedPro, setSelectedPro] = useState(null);
  const [activeTab, setActiveTab] = useState('Careers');

  useEffect(() => {
    // proid에 해당하는 프로 정보 가져오기
    const proInfo = proboxData.find(pro => pro.Proid === selectedProId);
    setSelectedPro(proInfo);
  }, [selectedProId]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className={styles.appsin}>
      <div className={styles.cover}>
        {selectedPro && (
          <>
            <h4>Pro Profile</h4>
            <div className={styles.probox1}>
              <div>
                <img src={selectedPro.image} alt="프로 사진" />
              </div>
              <div>
                <div>{selectedPro.Proname}</div>
                <div>별점: {selectedPro.StarAvarage}</div>
                <div>해시태그: {selectedPro.Hastag.map(tag => `#${tag}`).join(", ")}</div>
                <button>Chat 버튼</button>
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
                    <div className={styles.golfRangebox} > 
                    <div key={review.id}>
                      <p>{review.author}</p>
                      <p>Rating: {review.rating}</p>
                      <p>{review.comment}</p>
                    </div> </div> 
                  ))}
                </div>
              )}
            </div>
            <hr /> 

            <div className={styles.photos}>
              {selectedPro.Photos.map((photo, index) => (
                <img key={index} src={photo} alt={`Photo ${index + 1}`} className={styles.photo} />
              ))}
            </div>
            <hr /> 

    
              <h3>Golf Range</h3> 
              <div className={styles.golfRange}>
              {Array.isArray(selectedPro["Golf Range"]) ? (
                selectedPro["Golf Range"].map((range, idx) => (
                  <div key={idx} className={styles.golfRangebox} >
                    <p><strong>Name:</strong> {range.name}</p>
                    <p><strong>Address:</strong> {range.Address}</p>
                    <p><strong>Range ID:</strong> {range.rangeID}</p>
                    <div className={styles.rangePhotos}>
                      {range.photo.map((photo, index) => (
                        <img key={index} src={photo} alt={`Range Photo ${index + 1}`} className={styles.rangePhoto} />
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <p><strong>Name:</strong> {selectedPro["Golf Range"].name}</p>
                  <p><strong>Address:</strong> {selectedPro["Golf Range"].Address}</p>
                  <p><strong>Range ID:</strong> {selectedPro["Golf Range"].rangeID}</p>
                  <div className={styles.rangePhotos}>
                    {selectedPro["Golf Range"].photo.map((photo, index) => (
                      <img key={index} src={photo} alt={`Range Photo ${index + 1}`} className={styles.rangePhoto} />
                    ))}
                  </div>
                </div>
                    
              )}   </div>
            </div>
           </>
        )}
     </div> 

    </div>
  );
};

export default ProDetail;
