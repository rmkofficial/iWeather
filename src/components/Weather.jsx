import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const Weather = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const API_KEY = "609c0999830243e070dd441cf05ff88b";
        const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
        const forecastWeatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=5&appid=${API_KEY}`;

        const currentWeatherResponse = await axios.get(currentWeatherURL);

        const forecastWeatherResponse = await axios.get(forecastWeatherURL);

        setWeatherData({
          current: currentWeatherResponse.data,
          forecast: forecastWeatherResponse.data,
        });

        console.log("Current Weather Data:", currentWeatherResponse.data);
        console.log("5-Day Forecast Data:", forecastWeatherResponse.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeatherData(null);
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  return null;
};

Weather.propTypes = {
  city: PropTypes.string.isRequired,
};

export default Weather;
