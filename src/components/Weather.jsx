import React, { useEffect } from 'react'
import searchicon from '../assets/search.png'
import rain from '../assets/rain.png'
import wind from '../assets/wind.png'
import humidity from '../assets/humidity.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import snow from '../assets/snow.png'
import drizzle from '../assets/drizzle.png'
import { useState } from 'react'
import './Weather.css'

const Weather = () => {
    let [weatherdata, setWeatherData] = useState(null);
    async function getWeatherData(city) {
        try {
            const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_key}&units=metric`
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setWeatherData({
                temp: data.main.temp,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                city: data.name,
                icon:`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
               
            });
        } catch (error) {
          alert("Entered city not found");
          console.error("Error fetching weather data:", error);
        }
    }
    useEffect(() => {
        getWeatherData("Chennai");
    }, []);
    let [search, setSearch] = useState("");
    function handlechange(e) {
        setSearch(e.target.value);
        // Remove updating weatherdata.city here
    }
    function handleclick() {
        if (search && search.trim() !== "") {
            getWeatherData(search.trim());
        } else {
            alert("Please enter a city name");
        }
    }
  return (
    <div className='weather'>
      <div className="search-bar">
        <input value={search} onChange={handlechange} type="text" placeholder='Search'/>
        <img  onClick={handleclick} src={searchicon} alt="" />
      </div>
      {weatherdata ? (
        <>
          <img src={weatherdata.icon} alt="" className="weathericon" />
          <p className='temp'>{weatherdata.temp} &deg;c </p>
          <p className='loc'> {weatherdata.city}</p>
          <div className="weatherdata">
            <div className="col">
              <img src={humidity} alt="" />
              <div className="data">
                <p>{weatherdata.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind} alt="" />
              <div className="data">
                <p>{weatherdata.windSpeed} km/h</p>
                <span>Wind-speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  )
}

export default Weather
