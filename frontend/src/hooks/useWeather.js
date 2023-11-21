import React, { useState, useEffect } from "react";

export default function useWeather() {

  const [ weather, setWeather ] = useState({});
  const [ isLoading, setIsLoading ] = useState(false);

  const fetchWeather = async () => {
    try {
      const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=48.4359&longitude=-123.3516&daily=weather_code,temperature_2m_max,temperature_2m_min,sunset&timezone=America%2FLos_Angeles');
      const data = await res.json();
      //update state
      setWeather(data.daily);
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