import React from "react";
import '../styles/SortOptionsCard.scss'

export default function SortOptionsCard({ spots, menuOptions, isCheckbox}) {
  return (
    <ul className="sortOptions">
      <li>
        <input type="radio" name="sort" value="id" checked />
        <label for="id">Most Recent</label>
      </li>

      <li>
        <input type="radio" name="sort" value="rating_count" checked />
        <label for="rating_count">Most Visited</label>
      </li>

      <li>
        <input type="radio" name="sort" value="rating" checked />
        <label for="rating">Rating</label>
      </li>
    </ul>
  )
}