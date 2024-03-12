import React, { useState, useEffect } from "react";
import styles from "./Detail.module.css";
import proboxData from "./ProDetail.json";
import { ReactComponent as Mypro } from "./MyPro.svg";
import { ReactComponent as AddPro } from "./AddPro.svg";
import Slider from "react-slick";
import ProPhoto from "./ProPhoto";



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
    // 선택된 프로의 Like 상태를 토글
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
             <div> Pro Detail </div>
            <div className={styles.probox1}>
              <div className={styles.imagebox}>
                <img className={styles.imagethumbnail} src={selectedPro.image} alt="프로 사진" />
              </div>
              <div className={styles.probox3}>

                <div  className={styles.likeButtons}> 
             <div> <h3>{selectedPro.Proname}</h3>  </div> 
             
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
                <div>Review Rate {selectedPro.StarAvarage}</div>
                <div className={styles.hastag}><b>{selectedPro.Hastag.map(tag => `#${tag}`).join(", ")}</b></div>
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
                        <p>Rating: {review.rating}</p>
                        <p>{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <br />
              <div  className={styles.tabs}> Photos </div>

              {/*
              <div className={styles.photos}>
                {selectedPro.Photos.map((photo, index) => (
                  <div key={index} className={styles.photoWrapper}>
                    <img src={photo} alt={`Photo ${index + 1}`} className={styles.photo} />
                  </div>
                ))}
              </div> // */} 
          <ProPhoto />

              <hr />

              <h3>Golf Range</h3>
              <div className={styles.golfRange}>
                {Array.isArray(selectedPro["Golf Range"]) ? (
                  selectedPro["Golf Range"].map((range, idx) => (
                    <div key={idx} className={styles.golfRangebox}>
                      <p> {range.name}</p>
                      <p>{range.Address}</p>
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
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProDetail;