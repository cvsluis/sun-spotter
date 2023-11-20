import React from 'react';

export default function NavigationButton({ direction }) {
  return (
    <button className={`navigationButton__btn ${direction === 'back' && 'navigationButton__btn-grey'}`}>
      {direction === 'back' && 'Back'}
      {direction === 'forward' && 'Continue'}
    </button>
  );
};