import React, { ChangeEvent, useState } from "react";
import { City } from "../types";
import { SearchProps } from "../types/ui";

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

const Search: React.FC<SearchProps> = ({ selectedCity, onSelectCity }) => {
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<City[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClick = () => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((cities) => {
        setSearchResults(
          cities.map((city: City) => ({
            name: city.name,
            state: city.state,
            country: city.country,
            lat: city.lat,
            lon: city.lon,
          }))
        );
      });
  };

  const selectCity = (city: City) => {
    onSelectCity([...selectedCity, city]);
  };

  return (
    <>
      <input type="text" data-testid="search-input" onChange={handleChange} />
      <button data-testid="search-button" onClick={handleClick}>
        Search
      </button>

      <div data-testid="search-results">
        <ul>
          {searchResults &&
            searchResults.map((city) => (
              <li
                key={`${city.lat}-${city.lon}`}
                onClick={() => selectCity(city)}
              >{`${city.name} - ${city.country} | ${city.lat}, ${city.lon}`}</li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Search;