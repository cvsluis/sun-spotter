import { useState } from 'react';

export default function useSearchButtons() {
  const [sortMenuClass, setSortMenuClass] = useState('');
  const [filterMenuClass, setFilterMenuClass] = useState('');

  const toggleSearchButton = function(buttonType) {
    switch (buttonType) {
      case 'sort':
        setSortMenuClass((prevClass) => prevClass === '' ? 'allSpots__show' : '');
      case 'filter': 
        setFilterMenuClass((prevClass) => prevClass === '' ? 'allSpots__show' : '');
    }
  }

  return [sortMenuClass, filterMenuClass, toggleSearchButton]

}