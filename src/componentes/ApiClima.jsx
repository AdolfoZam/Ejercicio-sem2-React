import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const ApiClima = () => {

    const [weather,setWeather] = useState({})

    useEffect (() => {
                     
            const success = pos =>{
                const lat = pos.coords.latitude 
                const lon = pos.coords.longitude 
                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5a53f2c68115980668e6a817011c345a`)
                     .then(res => setWeather(res.data))
            }
             navigator.geolocation.getCurrentPosition(success);
    }, [])
            const centigrade=weather.main?.temp - 273.15
            const fahrenheit = (centigrade*1.8)+32
            const [isCentigrade,setIsCentigrade] = useState(true)
            const convert= () =>{
                // alert(fahrenheit)
                setIsCentigrade(!isCentigrade)
            }

            console.log(weather)

    return (
        <div className='app'>
            <div className="con-weather">
                <h1>Weather App</h1>
                <p>{weather.sys?.country} {"-"} {weather.name}</p>
                <div className="contain-general">
                    <div className="container-img">

                        <img src={` http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
                        <p> <b>{isCentigrade ? "Grade Celsius" : "Fahrenheit"} {""}</b>
                            {isCentigrade ? centigrade.toFixed(2) : fahrenheit.toFixed(2)}
                        </p>
                    </div>
                    <div className="container-date">
                        <p><b>Tem-Max:</b>
                            {(weather.main?.temp_max - 273.15).toFixed(2)} <br />
                            <b>Tem-Min:</b>
                            {(weather.main?.temp_min - 273.15).toFixed(2)} <br />
                            <b>Wind-Speed:</b>
                            {weather.wind?.speed} <br />
                            <b>Description:</b>
                            {weather.weather?.[0].main} <br />
                            <b>humidity:</b>
                            {weather.main?.humidity} <br />
                        </p>
                    </div>
                </div>
                <button on onClick={convert}>{isCentigrade ? "Fahrenheit" : "Centigrade"}</button>
            </div>
            
        </div>
    );
};

export default ApiClima;