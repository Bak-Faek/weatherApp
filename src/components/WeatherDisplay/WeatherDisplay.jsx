import PropTypes from "prop-types";
import "./WeatherDisplay.css";

export default function WeatherDisplay({ weather, addToFavorites }) {
  return (
    <div className="weather-display">
      <h2>
        {weather.city}
        <button onClick={addToFavorites}>Add to Favorites</button>
      </h2>
      <div>{weather.temp}</div>
      <img src={weather.icon} alt="" />
    </div>
  );
}

WeatherDisplay.propTypes = {
  weather: PropTypes.shape({
    city: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
  addToFavorites: PropTypes.func.isRequired,
};
