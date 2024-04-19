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

  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(1);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const API_KEY = "609c0999830243e070dd441cf05ff88b";
        const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

        const currentWeatherResponse = await axios.get(currentWeatherURL);

        setWeatherData(currentWeatherResponse.data);
        console.log("Current Weather Data:", currentWeatherResponse.data);
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
    <div>
      {weatherData && (
        <div>
          <h2>
            Current Weather in {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p>{formatDate(weatherData.dt)}</p>
          <p>Temperature: {kelvinToCelsius(weatherData.main.temp)} °C</p>
          <p>
            Max Temperature: {kelvinToCelsius(weatherData.main.temp_max)} °C
          </p>
          <p>
            Min Temperature: {kelvinToCelsius(weatherData.main.temp_min)} °C
          </p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt={weatherData.weather[0].description}
          />

          <div>
            <h3>Additional Weather Details</h3>
            <p>
              Thermal Sensation: {kelvinToCelsius(weatherData.main.feels_like)}{" "}
              °C
            </p>
            <p>Probability of Rain: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            <p>Air Humidity: {weatherData.main.humidity}%</p>
            <p>Cloudiness: {weatherData.clouds.all}%</p>
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
