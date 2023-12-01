import React from 'react';
import { useParams, useOutletContext, Link, useNavigate } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import '../styles/OneVisit.scss';
import useVisitData from '../hooks/useVisitData';
import Label from '../components/Label';
import Comment from '../components/Comment';
import ArrowLeft from '../assets/svg/ArrowLeft';

export default function OneVisit() {
  const navigate = useNavigate();
  
  // get logged in user
  const { userID } = useOutletContext();

  const visitId = useParams().id;
  const [visit, labels, comments, addComment, handleCommentChange, postComment] = useVisitData(visitId, userID);
  
  //how many stars to display
  const starNumber = Math.floor(Number(visit.rating));
  const needsPartialStar = starNumber - Number(visit.rating) !== 0;
  
  const labelList = labels.map(label => {
    return <Label key={'one-visit_' + label.id} active={true} label={label} lightorange={true} />;
  });
  
  const commentsList = comments.map(comment => {
    return <Comment key={'one-visit__comment_' + comment.id} comment={comment} />;
  }); 

  const userLink = `/users/${visit.user_id}`
  
  return (
    <div className='one-visit__container'>
      <button onClick={() => navigate(-1)} className='button-navigate'>
        <ArrowLeft sixe={'32px'} />
      </button>

      <div className='one-visit__details--container'>
        <div className='one-visit__header--container'>

          <div className='one-visit__header--profile'>
            <Link to={userLink}><img src={`http://localhost:8080/${visit.profile_pic}`} className='one-visit__header--image' alt={`Profile for ${visit.first_name} ${visit.last_name}`} /></Link>
                <div>
              <h2>{visit.first_name} {visit.last_name}</h2>
              <p>{visit.city}, {visit.province}</p>
            </div>
          </div>

          <hr className='one-visit--line'/>

          <div className='one-visit__visit-details--container'>
            <div className='one-visit--visit-header'>
              <h1>{visit.spot_name}</h1>
            { visit.rating > 0 &&
              <div className='one-visit--rating'>
                <div className='one-visit--stars'>
                {/* display all whole stars */}
                {[...Array(starNumber)].map(() => (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill about-spot__star" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                ))}
                {/* display partial star if needed */}
                {needsPartialStar &&
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-half about-spot__star" viewBox="0 0 16 16">
                    <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
                  </svg>
                }
                </div>
              </div>
            }
            </div>
            <h4>{visit.description}</h4>
            <p><TimeAgo date={visit.time_stamp} /></p>
            {/* refactor time */}

          </div>
          <div className='one-visit__labels'>
            {labelList}
          </div>
        </div>
        <div className='one-visit__comments--container'>
          <div className='one-visit__comments--posted-container'>
            <h4>Comments</h4>
            <div className='one-visit__comments--posted'>
              {commentsList}
            </div>
          </div>


        </div>

        { userID && 
        <div className='one-visit__comments--add'>
          <form onSubmit={postComment}>
            <div className='comment-input'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-fill comment-icon" viewBox="0 0 16 16">
                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
              </svg>
              <input value={addComment} onChange={handleCommentChange} placeholder='Add comment'></input>
            </div>
          </form>
        </div> }
      </div>
      
      <div className='one-visit__image--container'>
        <img src={`http://localhost:8080/${visit.image_url}`} alt={`sunset image`}/>
      </div>

    </div>
  );
}
