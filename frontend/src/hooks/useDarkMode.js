import { useState, useEffect } from 'react';

export default function useDarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  const dark = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    setDarkMode(true);
  };

  const light = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    setDarkMode(false);
  };

  const toggleTheme = (e) => {
    if (e.target.checked) dark();
    else light();
  };

  const [times, setTimes] = useState({});

  const checkDarkTime = async () => {
    const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=48.4359&longitude=-123.3516&daily=sunrise,sunset&timezone=America%2FLos_Angeles');
    const data = await res.json();
    setTimes(() => ({ sunset: new Date(data.daily.sunset[0]), sunrise: new Date(data.daily.sunrise[1]) }));
  };

  useEffect(() => {
    checkDarkTime();
  }, []);

  useEffect(() => {
    const now = new Date();
    if (now > times.sunset && now < times.sunrise) {
      document.getElementById("darkmode-toggle").checked = true;
      dark();
    }
  }, [times]);

  return { times, checkDarkTime, darkMode, toggleTheme };
}