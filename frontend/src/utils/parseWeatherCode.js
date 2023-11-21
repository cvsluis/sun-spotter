
/*
generalizes the WMO weather codes (0-99) into the following (not meteologically correct) categories:
  1) cloud + sun
  2) sunny
  3) cloudy
  4) rain
  5) sun and rain (developing rain)
  6) sun and snow (developing snow)
  7) snow
  8) thunderstorms
  10) hazy etc... (dust, sand... not common in vic but still need to handle the codes)
returns the category string (will eventually return icon)
*/

export default function parseWeatherCode(code) {
  //check code is valid
  if(code < 0 || code > 100) {
    return "invalid code";
  }

  //group big blocks of codes
  const fogCodes = Array.from([...Array(10).keys()], n => n + 40);
  const rainCodes = Array.from([...Array(20).keys()], n => n + 50);
  const snowCodes = Array.from([...Array(10).keys()], n => n + 70);
 
  //still need to assign: 02, 19
  const codes = {
    cloudsAndSun: [1, 3],
    clouds: fogCodes,
    sun: [0],
    sunAndRain: [14, 15, 16, 17, 18, 20, 21, 24, 25],
    rain: rainCodes.concat([80, 81, 82, 91, 92]),
    snow: [36, 37, 38, 39, 83, 84, 85, 86, 87, 88, 89, 90, 93, 94].concat(snowCodes),
    sunAndSnow: [22, 23, 26, 27],
    thunder: [13, 17, 29, 95, 96, 97, 98, 99],
    hazy: [4, 5, 6, 7, 8, 9, 10, 11, 12, 28,30, 31, 32, 33, 34, 35]
  }

  for (weatherType in codes) {
    if (codes[weatherType].includes(code)) {
      return weatherType
    }
  }
} 

console.log(parseWeatherCode(20));