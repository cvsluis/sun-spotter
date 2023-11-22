import React from 'react';

export default function SunsetTimeCard({ hour, minute }) {
  //console.log('the sunset time is ', hour, minute)
  return (
    <div className="sunset-time-card">
      <img src={ require(`../assets/weather-icons/sunset.png`) } className={"weather-bar__sunset"} alt='sunset icon'></img> 
      <span>
        {hour % 12}:{minute}
      </span>
    </div>
  )
}