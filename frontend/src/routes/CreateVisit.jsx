import React, { useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import FormDetails from '../components/FormDetails';
import AddImage from '../components/AddImage';
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

    const { setSearchInput } = useOutletContext();
    useEffect(() => {
      setSearchInput('');
    }, []);

  return (
    <div className='createSpot__container'>
      <div className='createSpot__container--details'>
        <h1>Add a Visit</h1>

        {modal === 1 &&
          <div>
            <div className='createSpot__header'>
              <h2>Step 1: Add your sunset details</h2>
            </div>
            <FormDetails formType={'visit'} handleFormChange={handleFormChange} handleLabelClick={handleLabelClick} isClicked={isClicked} visitValues={formData.visit} handleRatingInput={handleRatingInput} />
          </div>
        }

        {modal === 2 &&
          <div>
            <div className='createSpot__header'>
              <h2>Step 2: Attach a picture of your sunset!</h2>
            </div>
            <AddImage handleFileInput={handleFileInput} imagePreview={imagePreview} />
          </div>
        }

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