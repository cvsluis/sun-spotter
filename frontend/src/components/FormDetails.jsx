import React, { useState, useEffect } from 'react';
import Label from './Label';
import StarRating from './StarRating';
import '../styles/FormDetails.scss';

export default function FormDetails({ handleFormChange, handleLabelClick, isClicked, visitValues, handleRatingInput }) {
  // list of labels from db
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/labels')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setLabels(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const labelList = labels.map(label => {
    const active = isClicked(label);
    return <Label key={'createSpot_' + label.id} active={active} label={label} handleLabelClick={handleLabelClick} />;
  });

  return (
    <div className='formDetails__container'>

      <div className='formDetails__container--input-and-labels'>
        <div className='formDetails__container--inputs'>

          <div className='formDetails__container--input'>
            <label htmlFor="chosenName">What is this location called?</label>
            <input onChange={handleFormChange} value={visitValues.chosenName} className='formDetails__input--text' placeholder='Add Name' id='createSpot__form-id--name' name='chosenName' autoComplete='off'></input>
          </div>

          <div className='formDetails__container--input'>
            <label htmlFor="time_stamp">When did you visit this sunset spot?</label>
            <input onChange={handleFormChange} value={visitValues.time_stamp} className='formDetails__input--text' type="datetime-local" id='createSpot__form-id--date-time' name='time_stamp'></input>
          </div>

          <div className='formDetails__container--input'>
            <label htmlFor="description">Now tell us about this spot! How was the sunset?</label>
            <textarea onChange={handleFormChange} value={visitValues.description} className='formDetails__input--text' type="text" rows='8' maxLength="250" placeholder='Description' autoComplete='off' id='createSpot__form-id--description' name='description'></textarea>
          </div>

        </div>
        <div className='formDetails__container--labels formDetails__container--input'>
          <label htmlFor='labels'>Add some labels to let others know what this spot is about!</label>
          <div className='formDetails__labels--container' name='labels'>
            {labelList}
          </div>
        </div>
      </div>

      <div className='formDetails__container-rating'>
        <label htmlFor='rating'>How would you rate this spot?</label>
        <StarRating handleRatingInput={handleRatingInput} rating={visitValues.rating}/>
      </div>

    </div>
  );
};
