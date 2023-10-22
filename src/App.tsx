import React, { ChangeEvent, useState } from "react";
import "./App.css";

type City = {
  country: string;
  lat: number;
  lon: number;
  name: string;
  state: string;
};

function App() {
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<City[]>([]);
  const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

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
        console.log(cities);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Application</h1>
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
                >{`${city.name} - ${city.country}`}</li>
              ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
