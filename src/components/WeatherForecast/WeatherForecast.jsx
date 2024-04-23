import PropTypes from "prop-types";
import "./WeatherForecast.css";

export default function WeatherForecast({ forecast }) {
  return (
    <div className="weather-forecast">
      <h2>Les prévision pour les prochains jours</h2>
      <ul>
        {forecast.map((item, index) => (
          <li key={index}>
            <p>{item.date}</p>
            <img src={item.icon} alt="" />
            <p>{item.temp}° Celcius</p>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

WeatherForecast.propTypes = {
  forecast: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      temp: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};