import React from 'react';

//import components
import SunsetTimeCard from './SunsetTimeCard';
import ConditionsCard from './ConditionsCard';

//import styles
import "../styles/WeatherBar.scss"


export default function WeatherBar({ sunsetTime, conditionsArr }) { 

  //console.log(conditionsArr)

  return (
    <div className="weather-bar">
      <div className="weather-bar__sunset-time">
        <h2>Sunset Time</h2>
         <SunsetTimeCard {...sunsetTime} />
      </div>
  
      <div className="weather-bar__conditions">
        <h2>Conditions</h2>
        <div className='weather-bar__conditions-list'>
          {conditionsArr && [...Array(7).keys()].map(i => (
            <ConditionsCard conditions={conditionsArr[i]} key={conditionsArr[i].date} />
          ))}
          
        </div>
      </div>
    </div>   
  )
}