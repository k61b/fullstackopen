import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Country = ({ data: { name, capital, population, flag, languages } }) => {
    const [weather, setWeather] = useState({})

    useEffect(() => {
        axios
            .get(
                `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
            )
            .then(response => {
                setWeather(response.data.current)
            })
        return () => setWeather({})
    }, [capital])

    return (
        <>
            <h1>{name}</h1>
            <p>capital {capital}</p>
            <p>population {population}</p>
            <h3>Spoken languages</h3>
            <ul>
                {languages.map((language) => (
                    <li key={language.name}>{language.name}</li>
                ))}
            </ul>
            <img src={flag} alt={name} width="100px" />
            {Object.keys(weather).length !== 0 && (
                <>
                    <h2>Weather in {capital}</h2>
                    <p><storng>temperature:</storng> {weather.temperature} Celcius</p>
                    <img
                        src={weather.weather_icons[0]}
                        alt={weather.weather_descriptions}
                    />
                    <p>
                        <storng>wind:</storng> {weather.wind_speed} mph direction {weather.wind_dir}
                    </p>
                </>
            )}
        </>
    )
}

export default Country