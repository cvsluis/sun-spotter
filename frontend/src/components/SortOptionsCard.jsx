import React from "react";
import '../styles/SortOptionsCard.scss'

export default function SortOptionsCard({ spots, menuOptions, isCheckbox}) {
  console.log(menuOptions)
  return (
    <ul className="sortOptions">
     {menuOptions.map(option => (
        <li>option!!!!</li>
      ))}
    </ul>
  )
}