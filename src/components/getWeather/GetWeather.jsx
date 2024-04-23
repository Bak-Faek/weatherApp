import { useEffect } from "react";
import WeatherForm from "../WeatherForm/WeatherForm";
import WeatherDisplay from "../WeatherDisplay/WeatherDisplay";
import FavoritesList from "../FavoritesList/FavoritesList";
import WeatherForecast from "../WeatherForecast/WeatherForecast";
import WeatherData from "../WeatherData/WeatherData";
import "./GetWeather.css";

export default function GetWeather() {
  const { weather, forecast, favorites, fetchWeather, fetchForecast, addToFavorites, showWeather } = WeatherData();

  useEffect(() => {
    fetchForecast("Lyon");
  }, []);

  return (
    <section className="container">
      <h1>Votre Météo</h1>
      <div className="meteo">
        <WeatherForm onSubmit={fetchWeather} />
        <WeatherDisplay weather={weather} addToFavorites={addToFavorites} />
      </div>
      <div className="favorites">
        <FavoritesList favorites={favorites} showWeather={showWeather} />
      </div>
      <div className="forecast">
        <WeatherForecast forecast={forecast} />
      </div>
    </section>
  );
}