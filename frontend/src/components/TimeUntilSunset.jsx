import React, { useState, useEffect } from "react";
import useWeather from "../hooks/useWeather";

const TimeUntilSunset = () => {
  const { loading: weatherLoading, sunsetTime } = useWeather();
  const [timeToSunset, setTimeToSunset] = useState({ hours: 0, minutes: 0 });
  const [isParagraphVisible, setIsParagraphVisible] = useState(false);

  const currentTime = {
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
  };

  const convertToMinutes = (time) => {
    if (
      !time ||
      typeof time !== "object" ||
      !("hour" in time) ||
      !("minute" in time)
    ) {
      return NaN;
    }
    const { hour, minute } = time;
    return hour * 60 + minute;
  };

  const currentTimeInMin = convertToMinutes(currentTime);
  const sunsetTimeInMin = convertToMinutes(sunsetTime);

  const calculateTimeUntilSunset = (currentTime, sunsetTime) => {
    let timeDifference = sunsetTime - currentTime;

    if (timeDifference < 0) {
      timeDifference += 24 * 60;
    }

    const hours = Math.floor(timeDifference / 60);
    const minutes = timeDifference % 60;

    return { hours, minutes };
  };

  useEffect(() => {
    if (!weatherLoading && sunsetTime) {
      const result = calculateTimeUntilSunset(
        currentTimeInMin,
        sunsetTimeInMin
      );
      setTimeToSunset(result);
    }
  }, [weatherLoading, sunsetTime, currentTimeInMin, sunsetTimeInMin]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsParagraphVisible(true);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="header__timeUntilSunset">
      {weatherLoading ? (
        <p className="header__paragraph">Loading...</p>
      ) : (
        <p
          className={`header__paragraph slide-down-paragraph ${
            isParagraphVisible ? "visible" : ""
          }`}
        >
          Time until sunset: {timeToSunset.hours} hours and {timeToSunset.minutes} minutes
        </p>
      )}
    </div>
  );
};

export default TimeUntilSunset;
