import React, { useState } from "react";
import "./styles/app.css";
import { City } from "./types";
import Search from "./components/Search";
import WeatherList from "./components/WeatherList";

function WeatherApp() {
  const [selected, setSelected] = useState<City[]>([]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Weather Application</h1>
        <Search selectedCity={selected} onSelectCity={setSelected} />
        <WeatherList selectedCity={selected} />
      </header>
    </div>
  );
}

export default WeatherApp;
