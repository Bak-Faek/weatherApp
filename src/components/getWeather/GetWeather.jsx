import { useState } from "react";

export default function GetWeather() {
  const [weather, setWeather] = useState({
    icon: "--",
    temp: "-.-",
    city: "Veuillez entrer un ville",
  });

  const [favorites, setFavorites] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();

    let city = event.target.city.value;
    if (!city) {
      city = "Veuillez entrer un ville";
    }

    fetchWeather(city);
  }

  function fetchWeather(city) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_API_KEY
      }`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network Error");
        }
        return response.json();
      })
      .then((data) => {
        setWeather({
          icon:
            "https://openweathermap.org/img/wn/" +
            data.weather[0].icon +
            "@2x.png",
          temp: data.main.temp,
          city: data.name,
        });
      })
      .catch((error) => {
        console.error("Something bad happened!", error);
      });
  }

  function addToFavorites(city) {
    if (city !== "Veuillez entrer un ville") {
      const updatedFavorites = [...favorites];
      const isAlreadyFavorite = updatedFavorites.some(
        (fav) => fav.city === weather.city
      );
      if (!isAlreadyFavorite) {
        updatedFavorites.push(weather);
        setFavorites(updatedFavorites);
      } else {
        console.log("Cette ville est déjà dans vos favoris !");
      }
    }
  }

  function showWeather(city) {
    if (!city) {
      console.error("Aucun nom de ville fourni !");
      return;
    }
    fetchWeather(city);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder="City" name="city" />
        <button type="submit">Recherche</button>
      </form>

      <img src={weather.icon} alt="" />
      <div>{weather.temp}°C</div>
      <div>
        {weather.city}
        <button onClick={() => addToFavorites(weather.city)}>
          Ajouter aux favoris
        </button>
      </div>

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
