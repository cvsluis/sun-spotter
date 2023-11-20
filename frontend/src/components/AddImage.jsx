import React from 'react';
import '../styles/AddImage.scss'

export default function AddImage({ handleFileInput, imagePreview }) {

  return (
    <div className='addImage__container'>
      {!imagePreview && <input onChange={handleFileInput} type='file' className='drop-container' placeholder='Image Upload' name='image' id='createSpot__form-id--image'></input>}
      {imagePreview && 
        <div className='addImage__image'>
          <button className='addImage__remove-image' onClick={handleFileInput}>X</button>
          <img src={imagePreview}></img>
        </div>
      }
    </div>
  );
};