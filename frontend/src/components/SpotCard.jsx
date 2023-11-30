import React from 'react';
import { Link } from "react-router-dom";
import '../styles/SpotCard.scss';
import useSaved from '../hooks/useSaved';
import SaveEmpty from '../assets/svg/SaveEmpty';
import SaveFilled from '../assets/svg/SaveFilled'

export default function SpotCard({ spot, userID }) {
  const labelList = spot.list.join(', ');
  //how many stars to display
  const starNumber = Math.floor(Number(spot.rating));
  const needsPartialStar = starNumber - Number(spot.rating) !== 0;
  
  const [saveID, handleSaveClick] = useSaved(userID, spot.id);


  return (
    <div className='spotCard'>
      {userID && 
      <button className='spotCard__save-btn' onClick={(event) => {handleSaveClick(event, userID, spot.id)}}>
        { saveID ? <SaveFilled size={'24px'}/> : <SaveEmpty size={'24px'}/> }
      </button>
      }
    <Link to={`/spots/${spot.id}`} className='spotCard__container' id={`spot_card_${spot.id}`}>
      <div className='spotCard__image'>
        <img src={`http://localhost:8080/${spot.image_url}`} />
      </div>
      <div className='spotCard__details'>
        <div className='spotCard__header'>
          <h2>{spot.name}</h2>
            <div className='spotCard__rating--container'>
            <div className='spotCard__rating--stars'>
                {/* display all whole stars */}
                {[...Array(starNumber)].map(() => (
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-star-fill spotCard__rating--star" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                ))}
                {/* display partial star if needed */}
                {needsPartialStar &&
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-star-half spotCard__rating--star" viewBox="0 0 16 16">
                    <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
                  </svg>
                }
              </div> 
              <h5>    
              {spot.rating} 
              <span> ({spot.rating_count})</span>
            </h5>
          </div>
        </div>
        <h3>{spot.city}, {spot.province}</h3>
        <h4>{labelList}</h4>
      </div>
    </Link>
    </div>
  );
}