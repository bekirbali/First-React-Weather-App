import warmBg from "./assets/warm.jpg";
import coldBg from "./assets/cold.jpg";
import Descriptions from "./components/Descriptions";
import WeatherService from "./components/WeatherService";
import { useEffect, useState } from "react";

function App() {
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("imperial");
  const [city, setCity] = useState("Paris");
  const [bg, setBg] = useState(coldBg);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await WeatherService(city, units);

      setWeather(data);

      const threshold = units === "metric" ? 20 : 60;
      if (data.temp <= threshold) setBg(coldBg);
      else setBg(warmBg);
    };
    fetchWeatherData();
  }, [units, city]);

  const clickHandler = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText;

    const isCelsius = currentUnit === "℃";
    button.innerText = isCelsius ? "℉" : "℃";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);

      e.currentTarget.value = "";
    }
  };

  return (
    <div style={{ backgroundImage: `url(${bg})` }} className="app">
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                type="text"
                name="city"
                placeholder="Enter City"
                id="search-bar"
                onKeyDown={enterKeyPressed}
              />
              <button onClick={(e) => clickHandler(e)}>℃</button>
            </div>
            <div className="section section__temperature">
              <div className="icon">
                <h3>
                  {weather.name}, {weather.country}
                </h3>
                <img src={weather.iconURL} alt="weather icon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>
                  {weather.temp.toFixed(1)} {units === "metric" ? "℃" : "℉"}
                </h1>
              </div>
            </div>

            <Descriptions weather={weather} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
