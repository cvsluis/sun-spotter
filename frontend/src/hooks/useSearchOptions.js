import { useState } from 'react';


export default function useSearchOptions() {
  const [ isSearchMenu, setIsSearchMenu ] = useState(false);
  const [ isFilterMenu, setIsFilterMenu ] = useState(false);

  const toggleSearchOptionMenu = function(optionType) {
    switch(optionType){
      case 'sort':
        setIsSearchMenu(!isSearchMenu);
        if (isFilterMenu) {
          setIsFilterMenu(false);
        }
        break;
      case 'filter':
        setIsFilterMenu(!isFilterMenu);
        if (isSearchMenu) {
          setIsSearchMenu(false);
        }
    }
  }

  return [isSearchMenu, isFilterMenu, toggleSearchOptionMenu]

}