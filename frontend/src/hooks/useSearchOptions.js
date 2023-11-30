import { useState } from 'react';


export default function useSearchOptions() {
  const [ isSearchMenu, setIsSearchMenu ] = useState(false);
  const [ isFilterMenu, setIsFilterMenu ] = useState(false);

  const toggleSearchOptionMenu = function(optionType) {
    switch(optionType){
      case 'sort':
        setIsSearchMenu(!isSearchMenu);
        break;
      case 'filter':
        setIsFilterMenu(!isFilterMenu);
    }
  }

  return [isSearchMenu, isFilterMenu, toggleSearchOptionMenu]

}