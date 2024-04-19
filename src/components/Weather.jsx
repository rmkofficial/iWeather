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
    <div>
      {weatherData && (
        <div>
          {/* Current Weather Section */}
          <div>
            <h2>
              Current Weather in {weatherData.current.name},{" "}
              {weatherData.current.sys.country}
            </h2>
            <p>{formatDate(weatherData.current.dt)}</p>
            <p>
              Temperature: {kelvinToCelsius(weatherData.current.main.temp)} °C
            </p>
            <p>
              Max Temperature:{" "}
              {kelvinToCelsius(weatherData.current.main.temp_max)} °C
            </p>
            <p>
              Min Temperature:{" "}
              {kelvinToCelsius(weatherData.current.main.temp_min)} °C
            </p>
            <p>Weather: {weatherData.current.weather[0].description}</p>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}.png`}
              alt={weatherData.current.weather[0].description}
            />
          </div>

          {/* Additional Weather Details Section */}
          <div>
            <h3>Additional Weather Details</h3>
            <p>
              Thermal Sensation:{" "}
              {kelvinToCelsius(weatherData.current.main.feels_like)} °C
            </p>
            <p>Probability of Rain: {weatherData.current.main.humidity}%</p>
            <p>Wind Speed: {weatherData.current.wind.speed} m/s</p>
            <p>Air Humidity: {weatherData.current.main.humidity}%</p>
            <p>Cloudiness: {weatherData.current.clouds.all}%</p>
          </div>

          {/* Forecast Weather Section */}
          <div>
            <h3>Forecast Weather</h3>
            {weatherData.forecast.list.map((forecastItem) => (
              <div key={forecastItem.dt}>
                <p>{formatDate(forecastItem.dt)}</p>
                <p>
                  Max Temperature: {kelvinToCelsius(forecastItem.main.temp_max)}{" "}
                  °C
                </p>
                <p>
                  Min Temperature: {kelvinToCelsius(forecastItem.main.temp_min)}{" "}
                  °C
                </p>
                <img
                  src={`http://openweathermap.org/img/wn/${forecastItem.weather[0].icon}.png`}
                  alt={forecastItem.weather[0].description}
                />
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
