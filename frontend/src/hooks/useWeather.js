import React, { useState, useEffect } from "react";
import formatWeatherData from "../utils/formatWeatherData";

//to only get sunset time for current day, set isSunsetOnly to True
export default function useWeather(isSunsetOnly) {

  const [ weather, setWeather ] = useState({});
  
  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=48.4359&longitude=-123.3516&daily=weather_code,temperature_2m_max,temperature_2m_min,sunset&timezone=America%2FLos_Angeles')
      .then(res => res.json())
      .then(data => {
        //separate sunset time and conditions
        const {sunset, ...conditions} = data.daily;

        //extract hour and time of sunset
        const sunsetDate = new Date(sunset[0]); 
        const sunsetTime = { hour: sunsetDate.getHours(), minute: sunsetDate.getMinutes() };

        //Change YYYY-MM-DD to day of weeks: 
        var dayNames = [
          'Sun',
          'Mon',
          'Tues',
          'Wed',
          'Thurs',
          'Fri',
          'Sat'
        ];

        const day = conditions.time.map((date) => {
          const d = new Date(date).getDay();
          return dayNames[d];
        });
        
        //reformat conditions data to array of conditions per date objects
        const conditionsArr = conditions.time.map((date, i) => ({
          date,
          day: day[i],
          max_temp: conditions.temperature_2m_max[i],
          min_temp: conditions.temperature_2m_min[i],
          weather_code: conditions.weather_code[i]
        }))

        const spotWeather = {
          sunsetTime,
          conditionsArr
        }
        
        //update state
        setWeather(spotWeather);

      })
      .catch(err => ("Error fetching data: ", err));
  }, [])


  return weather;


}