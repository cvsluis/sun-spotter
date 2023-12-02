import React from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import '../styles/Comment.scss';

export default function Comment({ comment }) {
  return (
    <div className='comment__container'>
      <Link to={`/users/${comment.user_id}`}><img src={`http://localhost:8080/${comment.profile_pic}`}></img></Link>
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