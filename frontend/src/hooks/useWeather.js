import React, { useState, useEffect } from "react";
import formatWeatherData from "../utils/formatWeatherData";

//to only get sunset time for current day, set isSunsetOnly to True
export default function useWeather(isSunsetOnly) {

  const [ weather, setWeather ] = useState({});
  
  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=48.4359&longitude=-123.3516&daily=weather_code,temperature_2m_max,temperature_2m_min,sunset&timezone=America%2FLos_Angeles')
      .then(res => res.json())
      .then(data => {
        //format data
        const spotWeather = formatWeatherData(data.daily);

        //set state
        setWeather(spotWeather);
      })
      .catch(err => ("Error fetching data: ", err));
  }, [])

  return weather;
}