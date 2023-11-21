import React, { useState } from 'react';

export default function StarRating({ rating, handleRatingInput }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="formDetails__rating--container">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            onClick={() => handleRatingInput(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill={`${index <= (hover || rating) ? '#FCA712' : '#ccc'}`} className="bi bi-star-fill formDetails__rating--star" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg>  
          </button>
        );
      })}
    </div>
  );
};