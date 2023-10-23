import React, { useState } from "react";
import "./WeatherApp.css";
import { City } from "./types";
import Search from "./components/Search";
import WeatherList from "./components/WeatherList";

function WeatherApp() {
  const [selected, setSelected] = useState<City[]>([]);

  return (
    <div className="WeatherApp">
      <header className="WeatherApp-header">
        <h1>Weather Application</h1>
        <Search selectedCity={selected} onSelectCity={setSelected} />
        <WeatherList selectedCity={selected} />
      </header>
    </div>
  );
}

export default WeatherApp;
