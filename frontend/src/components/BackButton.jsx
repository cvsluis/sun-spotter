import React from 'react';
import '../styles/CreateSpot.scss';

export default function BackButton({ handleBackClick }) {
  return (
    <button className='navigationButton__btn navigationButton__btn-grey' onClick={handleBackClick}>
      Back
    </button>
  );
};