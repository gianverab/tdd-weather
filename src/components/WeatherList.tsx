import React from "react";
import { City } from "../types";
import { WeatherListProps } from "../types/ui";
import WeatherCard from "./WeatherCard";

const WeatherList: React.FC<WeatherListProps> = ({ selectedCity }) => {
  return (
    <div data-testid="my-weather-list">
      {selectedCity &&
        selectedCity.map((city: City) => (
          <WeatherCard key={`${city.lat}-${city.lon}`} city={city} />
        ))}
    </div>
  );
};

export default WeatherList;
