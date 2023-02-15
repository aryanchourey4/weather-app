import React from 'react'
import './CurrentWeather.css'

export default function CurrentWeather({data}) {
  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{data? data.city:null}</p>
          <p className="weather-description">{data?data.weather[0].description:null}</p>
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${data? data.weather[0].icon:'unknown'}.png`}
        />
      </div>
      <div className="bottom">
        <p className="temperature">{data? Math.round(data.main.temp):null}°C</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">
              {data? Math.round(data.main.feels_like):null}°C
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{data? data.wind.speed:null} m/s</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{data? data.main.humidity:null}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{data? data.main.pressure:null} hPa</span>
          </div>
        </div>
      </div>
    </div>
  )
}
