import React from 'react';

//import components
import SunsetTimeCard from './SunsetTimeCard';
import ConditionsCard from './ConditionsCard';


export default function WeatherBar({ weather }) {


  return (
  <>
    <div className="weather-bar__sunset-time">
      <h3>Sunset Time</h3>
        <SunsetTimeCard />
    </div>

    <div className="weather-bar__conditions">
      <h3>Conditions</h3>
        <ConditionsCard />
    </div>
  </>
  )
}