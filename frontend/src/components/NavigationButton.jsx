import React from 'react';
import '../styles/CreateSpot.scss'

export default function NavigationButton({ direction }) {
  return (
    <button className={`navigationButton__btn ${direction === 'back' && 'navigationButton__btn-grey'}`}>
      {direction === 'back' && 'Back'}
      {direction === 'forward' && 'Continue'}
    </button>
  );
};