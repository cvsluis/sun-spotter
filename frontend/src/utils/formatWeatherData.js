

// takes in weather data from the open weather api and returns formatted for the use of the app
export default function formatWeatherData (data, isSunsetOnly) { 

  //separate sunset time and conditions
  const {sunset, ...conditions} = data;

  //extract hour and time of sunset
  const sunsetDate = new Date(sunset[0]); 
  const sunsetTime = { hour: sunsetDate.getHours(), minute: sunsetDate.getMinutes() };
  
  //return only sunset time if requested
  if(isSunsetOnly) {
    return { sunsetTime } ;
  }

  //add day of week info: 
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
  }));

  return {sunsetTime, conditionsArr};
}