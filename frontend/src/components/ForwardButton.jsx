import React from 'react';
import '../styles/CreateSpot.scss'

export default function ForwardButton({ handleForwardClick, modal }) {
  return (
    <button className='navigationButton__btn' onClick={handleForwardClick}>
      { modal === 2 ? 'Submit' : 'Continue'}
    </button>
  );
};