import React from "react";
import data from "./DrivingRangeDetail.json";
import styles from "./Detail.module.css";
import StarRate from "./StarRate"
import DrivingRangePhoto from "./DrivingRagnePhoto";
import Popular from "../../main/Popular";

const DrivingRangeDetail = ({ rangeId }) => {
  // range_id에 따른 데이터 필터링 함수
  const range = data.find((range) => range.range_id === rangeId);

  if (!range) {
    return <div>해당하는 골프장의 정보가 없습니다.</div>;
  }

  const averge_rate = (
    range.reviews.reduce((total, review) => total + review.rating, 0) /
    range.reviews.length
  ).toFixed(1)

  return (
    <div className={styles.appsin}>
      <div className={styles.cover}>
        <div className={styles.rangebox1}>
          <div className={styles.rangebox1_imagebox}>
            <img
              className={styles.imagethumbnail}
              src={range.photo_url}
              alt="driving range picture"
            />
          </div>
          <div className={styles.rangebox1_details}>
            <h3>{range.name}</h3>
            <div>{range.address}</div>
            <div><StarRate rating={parseFloat(averge_rate)} /></div>
            <b>{range.hashtags.map(tag => `#${tag}`).join(", ")}</b>
          </div>
        </div>

        <div className={styles.rangebox2}>
          <div className={styles.rangebox2_review}>
            <h4>Reviews</h4>
            {range.reviews && range.reviews.length > 0 ? (
              <h3>
                {(
                  range.reviews.reduce((total, review) => total + review.rating, 0) /
                  range.reviews.length
                ).toFixed(1)}
              </h3>
            ) : (
              <h3>No reviews yet</h3>
            )}
            <p>({`${range.reviews.length} reviews`})</p>
          </div>

          <div className={styles.rangebox2_details}>
            <p>Practice tee: {range.practice_tee}</p>
            <hr></hr>
            <p>Distance: {range.distance}</p>
            <hr></hr>
            <p>Operating hours: {range.operating_hours}</p>
            <hr></hr>
            <p>Phone: {range.phone_number}</p>
          </div>
        </div>

        <div className={styles.rangebox2}>
          <div className={styles.rangebox2_review}>
            <h4>Price</h4>
            <p>(100 Balls)</p>
          </div>
          <div className={styles.rangebox2_details}>
            <p>Members: {range.price.for_members}</p>
            <hr></hr>
            <p>Guests: {range.price.for_guests}</p>
          </div>
        </div>
        <div>
          <h3>Photos</h3>
          <DrivingRangePhoto rangeId={rangeId} />
        </div>
        <div>
          <h3>Popular Pros</h3>
          <Popular />
        </div>

      </div>
    </div>
  );
};

export default DrivingRangeDetail;
