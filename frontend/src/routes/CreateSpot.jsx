import React from 'react';
import '../styles/CreateSpot.scss';

import ChooseSpot from '../components/ChooseSpot';
import FormDetails from '../components/FormDetails';
import AddImage from '../components/AddImage';
import BackButton from '../components/BackButton';
import ForwardButton from '../components/ForwardButton';

// state handler import
import useCreateSpotData from '../hooks/useCreateSpotData';

export default function CreateSpot() {
  const [
    formData, 
    imagePreview, 
    marker, 
    onMapClick, 
    isClicked, 
    handleLabelClick, 
    handleFormChange, 
    handleFileInput, 
    handleRatingInput, 
    activateNavButton, 
    modal, 
    handleBackClick, 
    handleForwardClick] = useCreateSpotData();

  return (
    <div className='createSpot__container'>
      <div className='createSpot__container--details'>
        <h1>Create a Spot</h1>

        {modal === 0 &&
          <div>
            <div className='createSpot__header'>
              <h2>Step 1: Choose your location</h2>
              <p>Click on the map to add a new pin!</p>
            </div>
            <ChooseSpot onMapClick={onMapClick} marker={marker} />
          </div>
        }

        {modal === 1 &&
          <div>
            <div className='createSpot__header'>
              <h2>Step 2: Add your visit to this sunset spot</h2>
            </div>
            <FormDetails handleFormChange={handleFormChange} handleLabelClick={handleLabelClick} isClicked={isClicked} visitValues={formData.visit} handleRatingInput={handleRatingInput} />
          </div>
        }

        {modal === 2 &&
          <div>
            <div className='createSpot__header'>
              <h2>Step 3: Attach a picture of your sunset!</h2>
            </div>
            <AddImage handleFileInput={handleFileInput} imagePreview={imagePreview} />
          </div>
        }

      </div>

      <div>
        <hr className='createSpot__line'></hr>

        <div className='createSpot__container--nav'>
          <BackButton handleBackClick={handleBackClick} />
          <ForwardButton handleForwardClick={handleForwardClick} modal={modal} buttonOn={activateNavButton}/>
        </div>
      </div>

    </div>
  );
}
