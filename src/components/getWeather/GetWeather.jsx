import { useState } from "react";

export default function GetWeather() {
  const [weather, setWeather] = useState({
    icon: "--",
    temp: "-.-",
    city: "ajouter une ville",
  });

  function handleSubmit(event) {
    event.preventDefault();

    let city = event.target.city.value;
    if (!city) {
      alert("Merci d'écrire un nom de ville correcte");
      return;
    }

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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder="City" name="city" />
        <button type="submit">Search</button>
      </form>
      <img src={weather.icon} alt="" />
      <div>{weather.temp}°C</div>
      <div>{weather.city}</div>
    </div>
  );
}
