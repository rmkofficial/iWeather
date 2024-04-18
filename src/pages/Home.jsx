import { useState } from "react";
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

  const handleSearch = () => {
    console.log("Search Text:", searchText);
  };

  return (
    <>
      <h1>Home</h1>
      <input
        type="text"
        placeholder="Enter your search text"
        value={searchText}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>
        <Link to="/weather">Search</Link>
      </button>
    </>
  );
};

export default Home;
