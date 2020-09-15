import React, { useState } from 'react';

import CountryInfo from './CountryInfo';

const CountryList = ({ filteredCountries }) => {
  const [country, setCountry] = useState([]);
  return (
    <>
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        filteredCountries.length !== 1 &&
        filteredCountries.map((country) => (
          <p key={country.name}>
            {country.name}
            <button onClick={() => setCountry([country])}>show</button>
          </p>
        ))
      )}
      {(country.length === 1 || filteredCountries.length === 1) && (
        <CountryInfo country={filteredCountries.length !== 1 ? country : filteredCountries} />
      )}
    </>
  );
};

export default CountryList;
