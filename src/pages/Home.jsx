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
  const API_URL = "http://api.weatherapi.com/v1/search.json";

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
    <div>
      {!isShowHome && (
        <>
          <div>
            <p>
              Welcome to <span>TypeWeather</span>
            </p>
            <p>Choose a location to see the weather forecast</p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search location"
              value={city}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
            {loading && <div className="spinner">Fetching...</div>}
          </div>
          <div>
            <ul>
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  onClick={() => handleSelectCity(suggestion)}
                >
                  {suggestion.name}, {suggestion.region} - {suggestion.country}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      {isShowHome && <Weather city={selectedCity?.name || ""} />}{" "}
    </div>
  );
};

export default Home;
