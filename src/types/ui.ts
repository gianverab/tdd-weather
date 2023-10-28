import { City } from ".";

export interface SearchProps {
  selectedCity: City[];
  onSelectCity: (city: City[]) => void;
}

export interface WeatherListProps {
  selectedCity: City[];
}

export interface WeatherCardProps {
  city: City;
}
