import { checkResponse } from "./checkResponse";

export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(checkResponse);
};

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  result.type = getWeatherType(result.temp.F);
  result.isDay = isDay(data.sys, Date.now());
  result.condition = data.weather[0].main.toLowerCase();

  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temperature, unit) => {
  if (unit === "F") {
    if (temperature > 86) return "hot";
    if (temperature >= 66) return "warm";
    return "cold";
  } else {
    //Celsius
    if (temperature > 30) return "hot";
    if (temperature >= 18.5) return "warm";
    return "cold";
  }
};
