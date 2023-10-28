import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import WeatherCard from "./WeatherCard";
import { Server } from "miragejs";
import { createMockServer } from "../createMockServer";
import userEvent from "@testing-library/user-event";

describe("Weathercard", () => {
  let server: Server;

  beforeEach(() => (server = createMockServer()));
  afterEach(() => server.shutdown());

  const city = {
    name: "Melbourne",
    country: "Australia",
    state: "Victoria",
    lat: 0,
    lon: 0,
  };

  it("renders city name", () => {
    render(<WeatherCard city={city} />);
    expect(screen.getByText(city.name)).toBeInTheDocument();
  });

  it("renders placeholder when temperature is not available", async () => {
    render(<WeatherCard city={city} />);
    expect(screen.getByText("-/-")).toBeInTheDocument();
  });

  it("renders temperature", async () => {
    render(<WeatherCard city={city} />);
    await screen.findByText(25.47);
  });
});
