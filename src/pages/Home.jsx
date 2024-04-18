import { useState } from "react";
import axios from "axios";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (event) => {
    let inputText = event.target.value;
    if (inputText.length > 0) {
      inputText = inputText.charAt(0).toUpperCase() + inputText.slice(1);
    }
    setSearchText(inputText);

    const apiKey = "07cf93b699f8470ca8d131206242903";
    const autocompleteUrl = `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${inputText}`;

    try {
      const response = await axios.get(autocompleteUrl);
      const suggestions = response.data.map((result) => result.name);
      setSuggestions(suggestions);
    } catch (error) {
      console.error("Failed to fetch autocomplete suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggest) => {
    setSearchText(suggest);
    setSuggestions([]);
  };

  const handleSearch = () => {
    if (!searchText) {
      console.log("Please enter a city name!");
      return;
    }

    console.log("Selected City:", searchText);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
      setSuggestions([]);
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
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSearch}>Search</button>
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggest, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggest)}>
              {suggest}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Home;
