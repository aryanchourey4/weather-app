import './App.css';
import Search from './Components/search/Search';
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { useState } from 'react';
import CurrentWeather from './Components/current-weather/CurrentWeather';
import Forecast from './Components/forecast/Forecast';
import image from './pexels-pixabay-531880.jpg';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch(console.log);
  };
  return (
    <div className="App" style={{ backgroundImage:`url(${image})` }}>
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather && <CurrentWeather data={currentWeather} />}
      <div className="forecasts">{forecast && <Forecast data={forecast} />}</div>
      
    </div>
  );
}

export default App;
