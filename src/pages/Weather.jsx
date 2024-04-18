import PropTypes from "prop-types";

const Weather = ({ city }) => {
  return (
    <>
      <h1>Weather</h1>
      <p>Weather forecast for {city}</p>
    </>
  );
};

Weather.propTypes = {
  city: PropTypes.string.isRequired,
};

export default Weather;
