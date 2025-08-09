import React, { useEffect, useState } from "react";
import "../styles/styleWeather.css";
import { Weather_API_KEY } from "./index";
import { ClockLoader } from "react-spinners";

const defaultCities = ["New York", "London", "Tokyo", "Sydney", "Delhi"];

export default function WeatherApp() {
  document.title = "Weather - NewsGrid";

  const [cityInput, setCityInput] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (city) => {
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${Weather_API_KEY}&q=${city}`
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();

      return {
        name: `${data.location.name}, ${data.location.country}`,
        temp: data.current.temp_c,
        condition: data.current.condition.text,
        icon: `https:${data.current.condition.icon}`,
        humidity: data.current.humidity,
        wind: data.current.wind_kph,
      };
    } catch {
      return null;
    }
  };

  const loadDefaultCities = async () => {
    setLoading(true);
    const results = await Promise.all(
      defaultCities.map((city) => fetchWeather(city))
    );
    setWeatherData(results.filter(Boolean));
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!cityInput.trim()) {
      alert("Please enter a city name!");
      return;
    }

    setLoading(true);
    const weather = await fetchWeather(cityInput.trim());
    setWeatherData(weather ? [weather] : []);
    setLoading(false);
  };

  useEffect(() => {
    loadDefaultCities();
  }, []);

  return (
    <div className="weather-page">
      <h1 className="weather-title">Weather</h1>

      <div className="weather-search-box">
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Enter city or location..."
        />
        <button className="weather-btn" onClick={handleSearch}>
          Get Weather
        </button>
      </div>

      {loading ? (
        <div className="loader-container">
          <ClockLoader/>
        </div>
      ) : (
        <div className="weather-container">
          {weatherData.length === 0 ? (
            <p>No weather data available.</p>
          ) : (
            weatherData.map((data, index) => (
              <div className="weather-card" key={index}>
                <h2>{data.name}</h2>
                <img src={data.icon} alt="Weather Icon" />
                <p><strong>Temperature:</strong> {data.temp} °C</p>
                <p><strong>Condition:</strong> {data.condition}</p>
                <p><strong>Humidity:</strong> {data.humidity}%</p>
                <p><strong>Wind Speed:</strong> {data.wind} km/h</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
