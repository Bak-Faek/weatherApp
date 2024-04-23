import PropTypes from "prop-types";
import "./WeatherForm.css";

export default function WeatherForm({ onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();
    const city = event.target.city.value;
    if (city.trim()) {
      onSubmit(city);
    }
  }

  return (
    <form className="weather-form" onSubmit={handleSubmit}>
      <input placeholder="City" name="city" />
      <button type="submit">Search</button>
    </form>
  );
}

WeatherForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};