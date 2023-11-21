import React from 'react';

//import components
import SunsetTimeCard from './SunsetTimeCard';
import ConditionsCard from './ConditionsCard';

//import styles
import "../styles/WeatherBar.scss"


export default function WeatherBar({ sunsetTime, conditions }) {


  return (
    <div className="weather-bar">
      <div className="weather-bar__sunset-time">
        <h3>Sunset Time</h3>
         <SunsetTimeCard sunsetTime={sunsetTime} />
      </div>
  
      <div className="weather-bar__conditions">
        <h3>Conditions</h3>
        <div>
          <ConditionsCard conditions={conditions} />
        </div>
      </div>
    </div>   
  )
}