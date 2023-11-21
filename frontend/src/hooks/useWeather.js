import React, { useState, useEffect } from "react";

export default function useWeather() {

  const [weather, setWeather] = useState({});

  useEffect (() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=48.4359&longitude=-123.3516&daily=weather_code,temperature_2m_max,temperature_2m_min,sunset&timezone=America%2FLos_Angeles')
      .then(res => res.json())
      .then(data => {
        //using ONLY dates, min + max temp, weather code, sunset times
        setWeather(data.daily);
      })
      .catch(err => {
        console.log('Error fetching data:', err);
      });
  }, [])

  return weather;


}