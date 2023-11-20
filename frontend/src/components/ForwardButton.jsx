import React from 'react';
import '../styles/CreateSpot.scss'

export default function ForwardButton({ handleForwardClick }) {
  return (
    <button className='navigationButton__btn' onClick={handleForwardClick}>
      Continue
    </button>
  );
};