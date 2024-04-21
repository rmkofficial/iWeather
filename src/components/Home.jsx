import "./Home.css";
import Logo from "../../public/images/Logo.svg";
import Type from "../../public/images/Type.svg";
import Spinner from "../../public/images/Spinner.svg";
import { useState } from "react";
import axios from "axios";
import Weather from "./Weather";

const Home = () => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isShowHome, setIsShowHome] = useState(false);

  const API_KEY = "07cf93b699f8470ca8d131206242903";
  const API_URL = "https://api.weatherapi.com/v1/search.json";

  const handleChange = (event) => {
    let { value } = event.target;

    value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

    setCity(value);

    if (value.trim() !== "") {
      setLoading(true);

      axios
        .get(`${API_URL}?key=${API_KEY}&q=${value}`)
        .then((response) => {
          setSuggestions(response.data);
        })
        .catch((error) => {
          console.error("Error fetching suggestions:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectCity = (selectedCity) => {
    console.log("Selected city:", selectedCity);
    setSelectedCity(selectedCity);
    setIsShowHome(true);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && suggestions.length > 0) {
      handleSelectCity(suggestions[0]);
    }
  };

  return (
    <div className="home-container">
      {!isShowHome && (
        <>
          <div className="logo-container">
            <img src={Logo} alt="logo" />
            <span>i</span>
            <img src={Type} alt="logo" />
          </div>
          <div className="welcome-container">
            <div className="title-section">
              <p>
                Welcome to <span>TypeWeather</span>
              </p>
              <p>Choose a location to see the weather forecast</p>
            </div>
            <div className="text-section">
              <input
                type="text"
                placeholder="Search location"
                value={city}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              />
              {loading && (
                <div className="spinner">
                  <img src={Spinner} alt="" />
                </div>
              )}
            </div>
            <div className="popover-section">
              <ul>
                {suggestions.map((suggestion) => (
                  <li
                    className="frame"
                    key={suggestion.id}
                    onClick={() => handleSelectCity(suggestion)}
                  >
                    {suggestion.name} - {suggestion.country}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
      {isShowHome && <Weather city={selectedCity?.name || ""} />}{" "}
    </div>
  );
};

export default Home;
