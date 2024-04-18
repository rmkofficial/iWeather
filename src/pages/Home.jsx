import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (event) => {
    let inputText = event.target.value;
    if (inputText.length > 0) {
      inputText = inputText.charAt(0).toUpperCase() + inputText.slice(1);
    }
    setSearchText(inputText);
  };

  const handleSearch = async () => {
    const apiKey = "07cf93b699f8470ca8d131206242903";
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${searchText}&aqi=no`;

    try {
      const response = await axios.get(apiUrl);
      console.log("Weather Information:", response.data);
    } catch (error) {
      console.error("Failed to fetch weather information:", error);
    }
  };

  return (
    <>
      <h1>Home</h1>
      <input
        type="text"
        placeholder="Enter a city name..."
        value={searchText}
        onChange={handleInputChange}
      />
      <Link to="/weather">
        <button onClick={handleSearch}>Search</button>
      </Link>
    </>
  );
};

export default Home;
