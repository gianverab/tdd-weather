import React, { useEffect, useState } from "react";
import { WeatherCardProps } from "../types/ui";
import { Weather } from "../types";

const WeatherCard: React.FC<WeatherCardProps> = ({ city }) => {
  const [weather, setWeather] = useState<Weather>();

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=f50bb0115af9544d77b95c4a77232960&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather({ temp: data.main.temp });
        console.log(data);
      });
  }, [city]);

  return (
    <div data-testid="weather-data">
      <h3>{city.name}</h3>
      <p>{weather ? weather.temp : "-/-"}</p>
    </div>
  );
};

export default WeatherCard;
