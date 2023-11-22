import React from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import ForwardButton from '../components/ForwardButton';
import '../styles/CreateSpot.scss';

// state handler import
import useCreateVisitData from '../hooks/useCreateVisitData';

export default function CreateVisit() {
  const spotID = useParams().id;

  const [
    formData,
    imagePreview,
    activateNavButton,
    modal,
    isClicked,
    handleLabelClick,
    handleFormChange,
    handleFileInput,
    handleRatingInput,
    handleBackClick,
    handleForwardClick] = useCreateVisitData(spotID);

  return (
    <div className='createSpot__container'>
      <div className='createSpot__container--details'>
        <h1>Add a Visit</h1>
      </div>

      <div>
        <hr className='createSpot__line'></hr>

        <div className='createSpot__container--nav'>
          <BackButton handleBackClick={handleBackClick} />
          <ForwardButton handleForwardClick={handleForwardClick} modal={modal} buttonOn={activateNavButton} />
        </div>
      </div>
    </div>
  )
}