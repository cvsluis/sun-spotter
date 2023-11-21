

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

  /* add current day of week info */

  var dayNames = [
    'Sun',
    'Mon',
    'Tues',
    'Wed',
    'Thurs',
    'Fri',
    'Sat'
  ];

  //get current day of week
  const day = new Date().getDay()

  //shift dayNames to line up 
  dayNames = dayNames.concat(dayNames.splice(0,day));
  
  //reformat conditions data to array of conditions per date objects
  const conditionsArr = conditions.time.map((date, i) => ({
    date,
    day: dayNames[i],
    max_temp: conditions.temperature_2m_max[i],
    min_temp: conditions.temperature_2m_min[i],
    weather_code: conditions.weather_code[i]
  }));

  return {sunsetTime, conditionsArr};
}