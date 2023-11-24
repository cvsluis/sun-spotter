import React from 'react';
import TimeAgo from 'react-timeago';
import '../styles/Comment.scss';

export default function Comment({ comment }) {
  return (
    <div className='comment__container'>
      <img src={`http://localhost:8080/${comment.profile_pic}`}></img>
      <div className='comment__bubble'>
        <div className='comment__bubble-header'>
          <h5>{comment.first_name} {comment.last_name}</h5>
          <p><TimeAgo date={comment.created_at} minPeriod={3} /></p>
        </div>
        <p>{comment.description}</p>
      </div>
    </div>
  );
};