import React, { useEffect, useState } from "react";
import "../styles/styleWeather.css";
import { Weather_API_KEY } from "./index";
import axios from "axios";
import { ClockLoader } from "react-spinners";

const defaultCities = ["New York", "London", "Tokyo", "Sydney", "Delhi"];

export default function WeatherApp() {
  document.title = "Weather - NewsGrid";

  const [cityInput, setCityInput] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (city) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Weather_API_KEY}&units=metric`
      );
      const data = res.data;

      return {
        name: `${data.name}, ${data.sys.country}`,
        temp: Math.round(data.main.temp),
        condition: data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        humidity: data.main.humidity,
        wind: data.wind.speed,
      };
    } catch (error) {
      console.error("Error fetching weather:", error);
      return null;
    }
  };

  const loadDefaultCities = async () => {
    setLoading(true);
    const results = await Promise.all(defaultCities.map((city) => fetchWeather(city)));
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setCityInput("");       // Clear input
    loadDefaultCities();    // Reload default cities
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
          onKeyDown={handleKeyPress}
          placeholder="Enter city or location..."
        />
        {cityInput && (
          <button className="clear-btn" onClick={handleClearSearch}>
            ✖
          </button>
        )}
        <button className="weather-btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      {loading ? (
        <div className="loader-container">
          <ClockLoader size={50} color="#ffffff" />
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
                <p><strong>🌡 Temp:</strong> {data.temp} °C</p>
                <p><strong>☁ Condition:</strong> {data.condition}</p>
                <p><strong>💧 Humidity:</strong> {data.humidity}%</p>
                <p><strong>🌬 Wind:</strong> {data.wind} km/h</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
