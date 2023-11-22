import React from 'react';
import { useParams } from 'react-router-dom';

import BackButton from '../components/BackButton';
import ForwardButton from '../components/ForwardButton';

import '../styles/CreateSpot.scss';

export default function CreateVisit() {
  const spotID = useParams().id;

  // fetch: post to /api/visits

  return (
    <div className='createSpot__container'>
      <div className='createSpot__container--details'>
        <h1>Add a Visit</h1>
      </div>

      <div>
        <hr className='createSpot__line'></hr>

        <div className='createSpot__container--nav'>
          <BackButton handleBackClick={null} />
          <ForwardButton handleForwardClick={null} modal={null} buttonOn={null} />
        </div>
      </div>
    </div>
  )
}