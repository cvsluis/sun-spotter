import React from "react";
import '../styles/ConditionsCard.scss';
import parseWeatherCode from "../utils/parseWeatherCode";

export default function ConditionsCard({ conditions }) {
  
  const weatherType = parseWeatherCode(conditions.weather_code);

 
  return(
    <div className="conditions-card">
      <div className="conditions-card__day">{conditions.day}</div>
      <div className="conditions-card__weather">
        <img src={ require(`../assets/weather-icons/${weatherType}.png`) }  className={'conditions-card__icon'} alt={weatherType}></img>
      </div>
      <div className="conditions-card__temps">
        <span className="conditions-card__max-temp">{conditions.max_temp}&deg;</span>
        <span className="conditions-card__min-temp">{conditions.min_temp}&deg;</span>
      </div>
      
    </div>
  )
}