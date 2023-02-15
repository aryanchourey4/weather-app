import "./App.css";
import Search from "./Components/search/Search";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { useState } from "react";
import CurrentWeather from "./Components/current-weather/CurrentWeather";
import Forecast from "./Components/forecast/Forecast";

function App() {
    const [load, setLoad] = useState(true)
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [backimg, setBackimg] = useState("Backgrounds/unknown.jpg");
    const [footer, setFooter] = useState("fixed");
    const init = () => {
        setLoad(false)
        const initFetch = fetch("http://ip-api.com/json/");
        Promise.all([initFetch])
            .then(async (response) => {
                const initing = await response[0].json();
                const currentWeatherFetch2 = fetch(
                    `${WEATHER_API_URL}/weather?lat=${initing.lat}&lon=${initing.lon}&appid=${WEATHER_API_KEY}&units=metric`
                );
                const forecastFetch2 = fetch(
                    `${WEATHER_API_URL}/forecast?lat=${initing.lat}&lon=${initing.lon}&appid=${WEATHER_API_KEY}&units=metric`
                );
        
                Promise.all([currentWeatherFetch2, forecastFetch2])
                    .then(async (response) => {
                        const weatherResponse2 = await response[0].json();
                        const forcastResponse2 = await response[1].json();
        
                        setCurrentWeather({
                            city: initing.city,
                            ...weatherResponse2,
                        });
                        setBackimg(
                            `Backgrounds/${
                                { city: initing.city, ...weatherResponse2 }
                                    .weather[0].icon
                            }.jpg`
                        );
                        setForecast({ city: initing.city, ...forcastResponse2 });
                        setFooter("static");
                    })
                    .catch(console.log);
            })
            .catch(console.log);        
    };




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
                setBackimg(
                    `Backgrounds/${
                        { city: searchData.label, ...weatherResponse }
                            .weather[0].icon
                    }.jpg`
                );
                setForecast({ city: searchData.label, ...forcastResponse });
                setFooter("static");
            })
            .catch(console.log);
    };
    return (
        <div className="App" onLoad={load?init:null} style={{ backgroundImage: `url(${backimg})` }}>
            <nav>
                <span className="hawayein">Hawayein</span>
                <Search onSearchChange={handleOnSearchChange} />
            </nav>
            <CurrentWeather data={currentWeather} />
            {forecast && <Forecast data={forecast} />}
            <footer className="footer" style={{ position: `${footer}` }}>
                <p>Made with ❤️ by Aryan Chourey.</p>
            </footer>
        </div>
    );
}

export default App;
