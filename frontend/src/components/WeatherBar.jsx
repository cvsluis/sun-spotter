import React from 'react';

//import components
import SunsetTimeCard from './SunsetTimeCard';
import ConditionsCard from './ConditionsCard';

//import styles
import "../styles/WeatherBar.scss"


export default function WeatherBar({ sunsetTime, conditionsArr }) {

  console.log(conditionsArr)

  return (
    <div className="weather-bar">
      <div className="weather-bar__sunset-time">
        <h3>Sunset Time</h3>
         <SunsetTimeCard {...sunsetTime} />
      </div>
  
      <div className="weather-bar__conditions">
        <h3>Conditions</h3>
        <div>
          {conditionsArr && [...Array(7).keys()].map(i => (
            <ConditionsCard conditions={conditionsArr[i]} key={conditionsArr[i].date} />
          ))}
          
        </div>
      </div>
    </div>   
  )
}