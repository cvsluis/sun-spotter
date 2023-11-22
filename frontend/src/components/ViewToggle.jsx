import React from 'react';

import '../styles/ViewToggle.scss';

export default function() {
  return (
    <div className='view-toggle'>
      <div className='view-toggle__option'>Map</div>
      <div className='view-toggle__option'>Saved</div>
      <div className='view-toggle__option view-toggle__option--selected'>Visits</div>
    </div>

  )
}