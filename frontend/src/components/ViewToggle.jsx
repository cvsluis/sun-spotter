import React from 'react';

import '../styles/ViewToggle.scss';

export default function({ view, setView}) {
  
  const handleToggleClick = function(event, viewName ) {
    event.preventDefault();

    console.log(`${viewName} clicked!`)

    if (view !== viewName) {
      setView(viewName);
    }
  }

  console.log('view is: ', view)

  return (
    <div className='view-toggle'>

      {view === 'map' ?
      <div className='view-toggle__option view-toggle__option--selected'>Map</div>
      :
      <div className='view-toggle__option' onClick={(event) => handleToggleClick(event, 'map')}>Map</div>
      }

      {view === 'saved' ?
      <div className='view-toggle__option view-toggle__option--selected'>Saved</div>
      :
      <div className='view-toggle__option' onClick={(event) => handleToggleClick(event, 'saves')}>Saved</div>
      }

      {view === 'visits' ?
      <div className='view-toggle__option view-toggle__option--selected'>Visits</div>
      :
      <div className='view-toggle__option' onClick={(event) => handleToggleClick(event, 'visits')}>Visits</div>
      }
    </div>

  )
}