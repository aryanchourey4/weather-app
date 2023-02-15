import "./App.css";
import Search from "./Components/search/Search";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { useState } from "react";
import CurrentWeather from "./Components/current-weather/CurrentWeather";
import Forecast from "./Components/forecast/Forecast";

function App() {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [backimg, setBackimg] = useState('Backgrounds/unknown.jpg')
    const [footer, setFooter] = useState('fixed')

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

                setCurrentWeather({
                    city: searchData.label,
                    ...weatherResponse,
                });
                setBackimg(`Backgrounds/${ {city: searchData.label, ...weatherResponse}.weather[0].icon }.jpg`);
                setForecast({ city: searchData.label, ...forcastResponse });
                setFooter('static')
            })
            .catch(console.log);

        
    };
    return (
        <div className="App" style={{ backgroundImage: `url(${backimg})` }}>
            <nav>
                <span className="hawayein">Hawayein</span>
                <Search onSearchChange={handleOnSearchChange} />
            </nav>
            {currentWeather && <CurrentWeather data={currentWeather} />}
            {forecast && <Forecast data={forecast} />}
            <footer className="footer" style={{ position: `${footer}` }}><p>Made with ❤️ by Aryan Chourey.</p></footer>
        </div>
    );
}

export default App;
