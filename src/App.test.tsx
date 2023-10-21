import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Weather Application", () => {
  it("renders title", () => {
    render(<App />);
    const text = screen.getByText(/Weather Application/i);
    expect(text).toBeInTheDocument();
  });
});
