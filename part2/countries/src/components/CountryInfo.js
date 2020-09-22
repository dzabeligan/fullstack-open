import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CountryInfo = ({ country }) => {
  const [data] = country;
  const [weather, setWeather] = useState({});
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${data.capital}`)
      .then((response) => setWeather(response.data.current));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    data && (
      <>
        <h1>{data.name}</h1>
        <p>capital {data.capital}</p>
        <p>population {data.population}</p>
        <h3>Spoken languages</h3>
        <ul>
          {data.languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img src={data.flag} alt="country flage" height="300" />
        <h3>Weather in {data.capital}</h3>
        <p>
          <strong>temperature:</strong> {weather.temperature} Celcius
        </p>
        {weather?.weather_icons &&
          weather.weather_icons.map((weatherIcon, index) => <img src={weatherIcon} alt="weather icon" key={index} />)}
        <p>
          <strong>wind:</strong> {weather.wind_speed} mph direction {weather.wind_dir}
        </p>
      </>
    )
  );
};

export default CountryInfo;
