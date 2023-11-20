import React from 'react';
import '../styles/AddImage.scss'

export default function AddImage({ handleFileInput }) {

  return (
    <div className='addImage__container'>
      <input onChange={handleFileInput} type='file' className='drop-container' placeholder='Image Upload' name='image' id='createSpot__form-id--image'></input>
    </div>
  );
};