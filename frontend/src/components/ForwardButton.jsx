import React from 'react';
import '../styles/CreateSpot.scss'

export default function ForwardButton({ handleForwardClick, modal, buttonOn }) {
  return (
    <button className={`navigationButton__btn ${buttonOn ? 'navigationButton__btn-orange' : null}`} onClick={buttonOn ? handleForwardClick : null}>
      { modal === 2 ? 'Submit' : 'Continue'}
    </button>
  );
};