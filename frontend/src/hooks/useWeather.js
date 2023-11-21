import React, { useState, useEffect } from "react";


//to only get sunset time for current day, set isSunsetOnly to True
export default function useWeather(isSunsetOnly) {

  const [ weather, setWeather ] = useState({});
  const [ isLoading, setIsLoading ] = useState(false);

  const fetchWeather = async () => {
    try {
      const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=48.4359&longitude=-123.3516&daily=weather_code,temperature_2m_max,temperature_2m_min,sunset&timezone=America%2FLos_Angeles');
      const data = await res.json();

      // change data to have current day's sunset time and weekly sunset data 
      const {sunset, ...conditions} = data.daily;

      //extract hour and time
      const sunsetDate = new Date(sunset[0]); 
      const sunsetTime = { hour: sunsetDate.getHours(), minute: sunsetDate.getMinutes() };
      
     // console.log(conditions)

      const conditionsArr = conditions.time.map((date, i) => ({
        date,
        max_temp: conditions.temperature_2m_max[i],
        min_temp: conditions.temperature_2m_min[i],
        weather_code: conditions.weather_code[i]
      }))
      console.log(conditionsArr)

      const spotWeather = {
        sunsetTime,
        conditionsArr
      }
      
      //update state
      setWeather(spotWeather);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  
  useEffect(() => {
    fetchWeather(); 
  }, [])

  // useEffect (() => {

  // .then(res => res.json())
  //     .then(data => {
          
  //       //using ONLY dates, min + max temp, weather code, sunset times
  //       setWeather(data.daily);
  //     })
  //     .catch(err => {
  //       console.log('Error fetching data:', err);
  //     });
  // }, [])
  if (isLoading) {
    return;
  }

  return weather;


}