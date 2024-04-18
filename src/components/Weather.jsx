import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const Weather = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const API_KEY = "07cf93b699f8470ca8d131206242903";
        const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=no&alerts=no`;

        const response = await axios.get(API_URL);
        setWeatherData(response.data);
        console.log("Weather data:", response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeatherData(null);
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      {weatherData && (
        <div>
          <div>
            <div>
              <p>
                {weatherData.location.name}, {weatherData.location.country}
              </p>
              <p>{formatDate(weatherData.forecast.forecastday[0].date)}</p>
            </div>
            <div>
              <img
                src={weatherData.current.condition.icon}
                alt={weatherData.current.condition.text}
              />
            </div>
            <div>
              <p>Temperature: {weatherData.current.temp_c} °C</p>
              <p>Condition: {weatherData.current.condition.text}</p>
            </div>
          </div>
          <div>
            <h3>Weather Details</h3>
            <p>Feels Like: {weatherData.current.feelslike_c} °C</p>
            <p>Precipitation: {weatherData.current.precip_mm} mm</p>
            <p>Wind Speed: {weatherData.current.wind_kph} km/h</p>
            <p>Humidity: {weatherData.current.humidity} %</p>
            <p>UV Index: {weatherData.current.uv}</p>
          </div>
          <div>
            {weatherData.forecast.forecastday.map((day) => (
              <div key={day.date}>
                <h3>{formatDate(day.date)}</h3>
                <p>Max Temp: {day.day.maxtemp_c} °C</p>
                <p>Min Temp: {day.day.mintemp_c} °C</p>
                <p>Condition: {day.day.condition.text}</p>
                <img
                  src={day.day.condition.icon}
                  alt={day.day.condition.text}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

Weather.propTypes = {
  city: PropTypes.string.isRequired,
};

export default Weather;
