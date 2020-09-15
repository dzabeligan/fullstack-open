import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CountryList from './components/CountryList';
import Filter from './components/Filter';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleSearch = ({ target: { value } }) => {
    setSearch(value);
  };

  const filteredCountries = countries.filter((country) => country.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <Filter value={search} onChange={handleSearch} />
      <CountryList filteredCountries={filteredCountries} />
    </div>
  );
};

export default App;
