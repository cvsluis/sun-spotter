import { useState, useEffect } from 'react';

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

  const useOutsideClick = (ref, type) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {    
          if (type === 'filter') {
            setIsFilterMenu(false);
          } else if (type === 'search') {
            setIsSearchMenu(false);
          }
        }
      }
      // Bind the event listener
      document.addEventListener("mouseup", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mouseup", handleClickOutside);
      };
    }, [ref]);
  }

  return [isSearchMenu, isFilterMenu, toggleSearchOptionMenu, useOutsideClick]

}