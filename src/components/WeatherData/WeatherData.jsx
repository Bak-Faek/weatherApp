import { useState, useEffect } from "react";

export default function WeatherData() {
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchForecast("Lyon");
  }, []);

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
        const updatedWeather = {
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
          temp: data.main.temp,
          city: data.name,
        };
        setWeather(updatedWeather);
        updateForecast(city);
      })
      .catch((error) => {
        console.error("Something bad happened!", error);
      });
  }

  function fetchForecast(city) {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${
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
        const filteredForecast = data.list.filter(
          (item, index) => index % 8 === 0 && index >= 8 && index <= 56
        );
        const mappedForecast = filteredForecast.map((item) => ({
          date: item.dt_txt,
          icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
          description: item.weather[0].description,
          temp: item.main.temp,
          humidity: item.main.humidity,
        }));

        setForecast(mappedForecast);
      })
      .catch((error) => {
        console.error("Something bad happened!", error);
      });
  }

  function addToFavorites() {
    const isAlreadyFavorite = favorites.some(
      (fav) => fav.city === weather.city
    );
    if (!isAlreadyFavorite) {
      setFavorites([...favorites, weather]);
    } else {
      console.log("Cette ville est déjà dans vos favoris !");
    }
  }

  function updateForecast(city) {
    fetchForecast(city);
  }

  function showWeather(city) {
    if (!city) {
      console.error("Aucun nom de ville fourni !");
      return;
    }
    fetchWeather(city);
  }

  return {
    weather,
    forecast,
    favorites,
    fetchWeather,
    fetchForecast,
    addToFavorites,
    showWeather,
  };
}