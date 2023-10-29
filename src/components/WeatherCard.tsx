import React, { useEffect, useState } from "react";
import { WeatherCardProps } from "../types/ui";
import { WeatherData } from "../types";

const WeatherCard: React.FC<WeatherCardProps> = ({ city }) => {
  const [weather, setWeather] = useState<WeatherData>();

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=f50bb0115af9544d77b95c4a77232960&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather({
          temp: data.main.temp,
          main: data.weather[0].main,
        });
        console.log(data);
      });
  }, [city]);

  return (
    <div>
      <h3>{city.name}</h3>
      <p data-testid="weather-temp">{weather ? weather.temp : "-/-"}</p>
      <p data-testid="weather-main">{weather && weather.main}</p>
    </div>
  );
};

export default WeatherCard;
