
import { useState, useEffect } from "react";
import axios from "axios";
// import.meta.env.VITE_SOME_KEY

const api_key = import.meta.env.VITE_SOME_KEY

function Country({ data: { name, capital, population, flags, languages } }) {
  const [weather, setWeather] = useState({});



  useEffect(() => {
    if (capital) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
        .then((response) => {
          setWeather(response.data);
          console.log(response.data);
        })
        .catch(error => console.error('Error fetching weather data:', error));
    }
    // Cleanup function
    return () => setWeather({});
  }, [capital]);
  // test

  return (
    <>
      <h1>{name["common"]}</h1>
      <p>capital {capital}</p>
      <p>population {population}</p>
      <h3>Spoken languages</h3>
      <ul>
        {Object.keys(languages).map((key, i) => (
          <li key={i}>{languages[key]}</li>
        ))}
      </ul>
      <img src={flags["png"]} alt={name["common"]} width="100px" />
      {weather.main && (
        <>
          <h2>Weather in {capital}</h2>
          <p>
            <strong>temperature:</strong> {weather.main.temp} Celsius
          </p>
          <img
            src={`https://openweathermap.org/img/w/${weather.weather[0]?.icon}.png`}
            alt={weather.weather[0]?.description}
          />
          <p>
            <strong>wind:</strong> {weather.wind.speed} mph direction {weather.wind.deg} degrees
          </p>
        </>
      )}
    </>
  );
}

export default Country;
