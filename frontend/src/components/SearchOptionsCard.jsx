import React from "react";

export default function SearchOptionsCard({ spots, menuOptions, isCheckbox}) {
  console.log(menuOptions)
  return (
    <ul className="searchOptions">
     {menuOptions.map(option => (
        <li>option</li>
      ))}
    </ul>
  )
}