import PropTypes from "prop-types";
import "./FavoritesList.css";

export default function FavoritesList({ favorites, showWeather }) {
  return (
    <div className="favorites-list">
      <h2>Vos favoris</h2>
      <ul>
        {favorites.map((fav, index) => (
          <li key={index}>
            <button onClick={() => showWeather(fav.city)}>{fav.city}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

FavoritesList.propTypes = {
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      city: PropTypes.string.isRequired,
      temp: PropTypes.number.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ).isRequired,
  showWeather: PropTypes.func.isRequired,
};