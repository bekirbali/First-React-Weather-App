const API_KEY = "6d8d685969d439d8178c3b7a901ebcf4";
const iconUrl = (iconId) => `http://openweathermap.org/img/wn/${iconId}@2x.png`;

const WeatherService = async (city, units = "metric") => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

  const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);
  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    sys: { country },
    name,
  } = data;
  const { description, icon } = weather[0];

  return {
    description,
    iconURL: iconUrl(icon),
    temp,
    feels_like,
    temp_max,
    temp_min,
    humidity,
    country,
    speed,
    name,
    pressure,
  };
};

export default WeatherService;
