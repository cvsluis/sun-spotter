import React from "react";
import '../styles/ConditionsCard.scss';

export default function ConditionsCard({ conditions }) {
  console.log(conditions)
  return(
    <div className="conditions-card">
      <div className="conditions-card__day">{conditions.day}</div>
      <div className="conditions-card__weather">code: {conditions.weather_code}</div>
      <div className="conditions-card__max-temp">max: {conditions.max_temp}</div>
      <div className="conditions-card__min-temp">min: {conditions.min_temp }</div>
    </div>
  )
}