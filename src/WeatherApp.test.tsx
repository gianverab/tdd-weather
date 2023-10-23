import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import App from "./WeatherApp";
import { Server } from "miragejs";
import { createMockServer } from "./createMockServer";
import userEvent from "@testing-library/user-event";

describe("Weather Application", () => {
  let server: Server;

  beforeEach(() => (server = createMockServer()));
  afterEach(() => server.shutdown());

  it("renders title", () => {
    render(<App />);
    const text = screen.getByText(/Weather Application/i);
    expect(text).toBeInTheDocument();
  });

  it("shows search results", async () => {
    render(<App />);

    const input = screen.getByTestId("search-input");
    userEvent.type(input, "Melbourne");

    const button = screen.getByTestId("search-button");
    userEvent.click(button);

    await waitFor(() =>
      expect(screen.getAllByText(/Melbourne/i).length).toEqual(5)
    );
  });

  it("shows search results details", async () => {
    render(<App />);

    const input = screen.getByTestId("search-input");
    userEvent.type(input, "Melbourne");

    const button = screen.getByTestId("search-button");
    userEvent.click(button);

    await waitFor(() =>
      expect(screen.getAllByText(/Melbourne/i).length).toEqual(5)
    );
    expect(screen.getAllByText(/-37.8142176, 144.9631608/i).length).toEqual(1);
  });

  it("add search result to my weather list", async () => {
    render(<App />);

    const input = screen.getByTestId("search-input");
    userEvent.type(input, "Melbourne");

    const button = screen.getByTestId("search-button");
    userEvent.click(button);

    await waitFor(() =>
      expect(screen.getAllByText(/Melbourne/i).length).toBe(5)
    );

    const selected = screen.getAllByText(/Melbourne/i)[3];
    userEvent.click(selected);

    expect(
      within(screen.getByTestId("my-weather-list")).getByText(/Melbourne/i)
    ).toBeInTheDocument();
  });
});
