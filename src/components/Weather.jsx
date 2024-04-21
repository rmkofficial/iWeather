import "./Weather.css";
import Thermal from "./../../public/images/thermal.svg";
import Rain from "./../../public/images/rain.svg";
import Wind from "./../../public/images/wind.svg";
import Humidity from "./../../public/images/air-humidity.svg";
import Uv from "./../../public/images/uv.svg";
// import Storm from "../../public/images/storm-day.png";
// import Rainday from "../../public/images/rain-day.png";
// import Cloudy from "../../public/images/cloudy-day.png";
// import FewClouds from "../../public/images/fewClouds.png";
// import Clear from "../../public/images/clear-day.png";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const Weather = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDayOfWeek = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString("en-US", { weekday: "long" });
  };

  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(1);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const API_KEY = "609c0999830243e070dd441cf05ff88b";
        const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
        const forecastWeatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=5&appid=${API_KEY}`;

        const [currentWeatherResponse, forecastWeatherResponse] =
          await Promise.all([
            axios.get(currentWeatherURL),
            axios.get(forecastWeatherURL),
          ]);

        setWeatherData({
          current: currentWeatherResponse.data,
          forecast: forecastWeatherResponse.data,
        });

        console.log("Current Weather Data:", currentWeatherResponse.data);
        console.log("Forecast Weather Data:", forecastWeatherResponse.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeatherData(null);
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  return (
    <div className="content-container">
      {weatherData && (
        <div>
          {/* Current Weather Section */}
          <div className="card-section">
            <div className="today-section">
              <div className="info">
                <p>
                  {weatherData.current.name}, {weatherData.current.sys.country}
                </p>
                <p>{formatDate(weatherData.current.dt)}</p>
              </div>
              <div className="weather">
                <div className="weather-info">
                  <p>{kelvinToCelsius(weatherData.current.main.temp)}°c</p>
                  <p>
                    {" "}
                    {kelvinToCelsius(weatherData.current.main.temp_min)}°c /
                    {kelvinToCelsius(weatherData.current.main.temp_max)}°c
                  </p>
                  <p>{weatherData.current.weather[0].description}</p>
                </div>
                <div className="weather-icon">
                  <img
                    src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}.png`}
                    alt={weatherData.current.weather[0].description}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Weather Details Section */}
          <div className="detail-section">
            <p>
              <img src={Thermal} alt="" />
              Thermal Sensation:{" "}
              <span>
                {kelvinToCelsius(weatherData.current.main.feels_like)} °C
              </span>
            </p>
            <p>
              <img src={Rain} alt="" />
              Probability of Rain:
              <span>{weatherData.current.main.humidity}%</span>{" "}
            </p>
            <p>
              <img src={Wind} alt="" />
              Wind Speed:
              <span>{weatherData.current.wind.speed} m/s</span>
            </p>
            <p>
              <img src={Humidity} alt="" />
              Air Humidity: <span>{weatherData.current.main.humidity}%</span>
            </p>
            <p>
              <img src={Uv} alt="" />
              Cloudiness: <span>{weatherData.current.clouds.all}%</span>
            </p>
          </div>

          {/* Forecast Weather Section */}
          <div className="forecast-section">
            {weatherData.forecast.list.map((forecastItem) => (
              <div key={forecastItem.dt}>
                <p>{formatDayOfWeek(forecastItem.dt)}</p>
                <img
                  src={`http://openweathermap.org/img/wn/${forecastItem.weather[0].icon}.png`}
                  alt={forecastItem.weather[0].description}
                />
                <div className="list">
                  <p>{kelvinToCelsius(forecastItem.main.temp_max)}°C</p>
                  <p>{kelvinToCelsius(forecastItem.main.temp_min)}°C</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

Weather.propTypes = {
  city: PropTypes.string.isRequired,
};

export default Weather;
