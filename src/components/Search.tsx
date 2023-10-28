import React, { ChangeEvent, useRef, useState } from "react";
import { City } from "../types";
import { SearchProps } from "../types/ui";
import "../styles/search.css";

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

const Search: React.FC<SearchProps> = ({ selectedCity, onSelectCity }) => {
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<City[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

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
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const selectCity = (city: City) => {
    onSelectCity([...selectedCity, city]);
  };

  const handleSelect = (city: City) => {
    selectCity(city);
    setSearchResults([]);
  };

  return (
    <div className="search-container">
      <div className="input-container">
        <input
          type="text"
          data-testid="search-input"
          onChange={handleChange}
          placeholder="Enter city name (e.g. Melbourne, New York)"
          ref={inputRef}
        />
        <button data-testid="search-button" onClick={handleClick}>
          Search
        </button>
      </div>
      <div data-testid="search-results">
        <ul className="search-results">
          {searchResults &&
            searchResults.map((city) => (
              <li
                className="search-result"
                key={`${city.lat}-${city.lon}`}
                onClick={() => handleSelect(city)}
              >
                <span className="city-name">
                  {city.name}, {city.country}{" "}
                </span>
                <span className="city-location">{`${city.lat}, ${city.lon}`}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;
