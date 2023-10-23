import React from "react";
import { City } from "../types";
import { WeatherListProps } from "../types/ui";

const WeatherList: React.FC<WeatherListProps> = ({ selectedCity }) => {
  return (
    <div data-testid="my-weather-list">
      {selectedCity &&
        selectedCity.map((city: City) => (
          <p key={`${city.lat}-${city.lon}`}>{city.name}</p>
        ))}
    </div>
  );
};

export default WeatherList;
