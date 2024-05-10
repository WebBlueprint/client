import React, { useState, useEffect } from "react";
import style from "./ProDetailEdit.module.css"; // 스타일 시트 가져오기
import proboxData from "./ProDetail.json"; // 데이터 가져오기
import { ReactComponent as Mypro } from "./MyPro.svg"; // 아이콘 가져오기
import { ReactComponent as AddPro } from "./AddPro.svg"; // 아이콘 가져오기
import { ReactComponent as Edit } from "./Edit.svg"; // 아이콘 가져오기
import { ReactComponent as Save } from "./SaveCheck.svg"; // 아이콘 가져오기
import { ReactComponent as Pen } from "./Pen.svg"; // 아이콘 가져오기


import ProPhoto from "./ProPhoto"; // 사진 컴포넌트 가져오기
import StarRating from "./StarRate"; // 별점 컴포넌트 가져오기

const ProDetailEdit = () => {
  // 상태 변수 선언 및 초기화
  const [selectedProId, setSelectedProId] = useState(1);
  const [selectedPro, setSelectedPro] = useState(null);
  const [activeTab, setActiveTab] = useState('Careers');
  const [likedPros, setLikedPros] = useState([]);
  const [editedName, setEditedName] = useState('');
  const [editedImage, setEditedImage] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedHashtags, setEditedHashtags] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // 선택된 프로 정보를 가져오는 useEffect
  useEffect(() => {
    const proInfo = proboxData.find(pro => pro.Proid === selectedProId);
    setSelectedPro(proInfo);
    setEditedName(proInfo.Proname);
    setEditedHashtags(proInfo.Hastag.join(', '));
    setOriginalContent(proInfo.Careers);
  }, [selectedProId]);

  // 활성 탭이 변경될 때 컨텐츠 업데이트하는 useEffect
  useEffect(() => {
    if (activeTab === 'Careers') {
      setEditedContent(selectedPro?.Careers || '');
    } else if (activeTab === 'Curriculum') {
      setEditedContent(selectedPro?.Curriculum || '');
    }
  }, [activeTab, selectedPro]);

  // 탭 클릭 처리 함수
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setEditedContent(selectedPro ? selectedPro[tabName] || '' : '');
  };

  // 좋아요 클릭 처리 함수
  const handleLikeClick = () => {
    setSelectedPro(prevPro => ({
      ...prevPro,
      Like: prevPro.Like === 1 ? 0 : 1
    }));
  };

  // 이름 변경 처리 함수
  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  // 이미지 변경 처리 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditedImage(URL.createObjectURL(file));
  };

  // 해시태그 변경 처리 함수
  const handleHashtagsChange = (e) => {
    setEditedHashtags(e.target.value);
  };

  // 컨텐츠 변경 처리 함수
  const handleContentChange = (e) => {
    setEditedContent(e.target.value);
  };

  // 모든 변경 사항 저장 처리 함수
  const handleSaveAll = () => {
    setSelectedPro(prevPro => ({
      ...prevPro,
      Proname: editedName,
      Hastag: editedHashtags.split(',').map(tag => tag.trim()),
      [activeTab]: editedContent
    }));
    setIsEditingName(false);
    sessionStorage.setItem(`pro_${selectedProId}`, JSON.stringify({
      Proname: editedName,
      Hastag: editedHashtags.split(',').map(tag => tag.trim()),
      [activeTab]: editedContent
    }));
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  // JSX 반환
  return (
    <div className={style.appsin}>
    <div className={style.cover}>
      {selectedPro && (
        <>
          {/* 프로 디테일 편집 */}
          <div> Pro Detail Edit </div>
          <div className={style.probox1}>
            <div className={style.imagebox}>
              {/* 이미지 업로드 */}
              <input type="file" id="imageUpload" style={{ display: 'none' }} onChange={handleImageChange} />
              <label htmlFor="imageUpload">
                <Edit style={{ fill: "#1B4607", width: "2em", height: "2em", cursor: "pointer" }} className={style.editiconphoto} />
              </label>
              <img className={style.imagethumbnail} src={selectedPro.image} alt="프로 사진" />
            </div>
            <div className={style.probox3}>
              <div className={style.likeButtons}>
               
                {isEditingName ? (
                  <div>
                    <input type="text" value={editedName} onChange={handleNameChange} style={{ background: 'white' }}  />
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center" }} onClick={() => setIsEditingName(true)}>
                  <Pen style={{ fill: "#808080", width: "1.5em", height: "1.5em" }} />
                  <h3 style={{ margin: "0 0.5em" }}>{editedName}</h3>
                  </div>
                )}
                {isEditingName ? (
                  <div>
                    <textarea className={style.hastagtext} value={editedHashtags} onChange={handleHashtagsChange} style={{ background: 'white' }} />
                  </div>
                ) : (
                  <div onClick={() => setIsEditingName(true)}>
                    {editedHashtags}
                  </div>
                )}
              </div>
              {isEditingName && (
                <div onClick={handleSaveAll} className= {style.savebtn }onMouseEnter={() => document.getElementById('saveIcon').style.fill = '#1B4607'} onMouseLeave={() => document.getElementById('saveIcon').style.fill = '#808080'}>
                <Save id="saveIcon" style={{ fill: "#808080", width: "1.5em", height: "1.5em" }} /> Save
              </div>
               )}
            </div>
          </div>
          <div className={style.probox2}>
            <div className={style.tabs}>
              <div className={`${style.tab} ${activeTab === 'Careers' ? style.active : ''}`} onClick={() => handleTabClick('Careers')}>Careers</div>
              <div className={`${style.tab} ${activeTab === 'Curriculum' ? style.active : ''}`} onClick={() => handleTabClick('Curriculum')}>Curriculum</div>
              <div className={`${style.tab} ${activeTab === 'Reviews' ? style.active : ''}`} onClick={() => handleTabClick('Reviews')}>Reviews</div>
            </div>
            <div className={style.tabContent}>
              {(activeTab === 'Careers' || activeTab === 'Curriculum') && (
                <div>
                  {isEditingName ? (
                    <input type="text" value={editedContent} onChange={handleContentChange} style={{ background: 'white' }} />
                  ) : (
                    <div onClick={() => setIsEditingName(true)}>
                      {editedContent}
                    </div>
                  )}

                </div>
              )}
              {activeTab === 'Reviews' && (
                <div className={style.golfRange}>
                  {selectedPro.Reviews.map(review => (
                    <div className={style.golfRangebox} key={review.id}>
                      <b>{review.author}</b>
                      <div><StarRating rating={review.rating} /></div>
                      <p>{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <br />
            <div className={style.tabs}>Photos</div>
            <ProPhoto photos={selectedPro["Golf Range"].flatMap(range => range.photo)} />
            <br />
            <div>
              <div className={style.tabs}> Golf Range</div>
              <div className={style.golfRange}>
                {Array.isArray(selectedPro["Golf Range"]) ? (
                  selectedPro["Golf Range"].map((range, idx) => (
                    <div key={idx} className={style.golfRangebox}>
                      <div className={style.rangePhotos}>
                        <img src={range.photo[0]} alt={`Range Photo ${idx + 1}`} className={style.rangePhoto} />
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
            <br />
            {isSaved && <div className={style.alert}>저장 완료</div>}
          </div>
        </>
      )}
    </div>
  </div>
  );
};

export default ProDetailEdit;
