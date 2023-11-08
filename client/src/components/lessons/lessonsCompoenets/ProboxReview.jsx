import React, { useState } from "react";
import StarRating from "./StarRating"

const ProboxReview = () => {
    const [rating, setRating] = useState(0); // Initial rating is 0
    const [comment, setComment] = useState("");
    const [isHovered, setIsHovered] = useState(false);

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
        console.log("Rating: " + selectedRating); // 콘솔에 선택한 별점 출력
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = () => {
        // Handle comment submission here, e.g., send to a server
        console.log("Comment: " + comment);
        // Reset the rating and comment after submission
        setRating(0);
        setComment("");
    };

    return (
        <div>
            <div>
                <div>
                    <h3>Leave a Review</h3>
                    <div>
                        <StarRating rating={rating} onStarClick={handleStarClick} />
                        {/* Pass the rating and the function to update it */}
                    </div>
                    <textarea
                        rows="4"
                        cols="50"
                        placeholder="Write your comment here"
                        value={comment}
                        onChange={handleCommentChange}
                    />
                    <button onClick={handleCommentSubmit}>Submit Review</button>
                </div>
            </div>
        </div>
    );
};

export default ProboxReview;
