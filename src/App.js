import React, { useState } from 'react';
import axios from 'axios';
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm, WiFog, WiSmoke, WiDust, WiTornado, WiShowers} from 'react-icons/wi';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const getWeatherIcon = (condition) => {
    const iconProps = {
      size: 50,
      className: "animate-bounce"
    };

    switch (condition) {
      case 'Clear':
        return <WiDaySunny {...iconProps} />;
      case 'Clouds':
        return <WiCloud {...iconProps} />;
      case 'Rain':
        return <WiRain {...iconProps} />;
      case 'Drizzle':
        return <WiShowers {...iconProps} />;
      case 'Snow':
        return <WiSnow {...iconProps} />;
      case 'Thunderstorm':
      case 'Squall':
        return <WiThunderstorm {...iconProps} />;
      case 'Mist':
      case 'Fog':
        return <WiFog {...iconProps} />;
      case 'Smoke':
        return <WiSmoke {...iconProps} />;
      case 'Sand':
      case 'Haze':
      case 'Dust':
      case 'Ash':
        return <WiDust {...iconProps} />;
      case 'Tornado':
        return <WiTornado {...iconProps} />;
      default:
        return <WiDaySunny {...iconProps} />;
    }
  };

  const fetchWeather = async () => {
    try {
      const apiKey = 'de93ece13e4d8e6615f76edfac6a7948';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('City not found or network issue');
      setWeather(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-200">
      <h1 className="text-4xl mb-8">Weather App</h1>
      <div className="mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 rounded-md border border-gray-400"
          placeholder="Enter city name"
        />
        <button
          onClick={fetchWeather}
          className="ml-2 p-2 bg-blue-500 text-white rounded-md transform transition-transform duration-300 hover:scale-110"
        >
          Get Weather
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {weather && (
        <div className="text-center animate-fadeIn">
          <h2 className="text-2xl mb-2">{weather.name}</h2>
          <div className="flex items-center justify-center mb-2">
            {getWeatherIcon(weather.weather[0].main)}
            <span className="text-xl ml-2">{weather.weather[0].description}</span>
          </div>
          <p className="text-xl">Temperature: {weather.main.temp}°C</p>
          <p className="text-xl">Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
