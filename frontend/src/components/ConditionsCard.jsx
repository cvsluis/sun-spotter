import React from "react";
import '../styles/ConditionsCard.scss';
import parseWeatherCode from "../utils/parseWeatherCode";

export default function ConditionsCard({ conditions }) {
  
  const weatherType = parseWeatherCode(conditions.weather_code);
  return(
    <div className="conditions-card">
      <div className="conditions-card__day">{conditions.day}</div>
      <div className="conditions-card__weather">code: {weatherType}</div>
      <div className="conditions-card__max-temp">max: {conditions.max_temp}</div>
      <div className="conditions-card__min-temp">min: {conditions.min_temp }</div>
    </div>
  )
}