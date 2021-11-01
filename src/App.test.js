import { render, screen } from "@testing-library/react";
import App from "./App";

test("check if viewer loaded", () => {
  render(<App />);
  const linkElement = screen.getByTestId("integration-element");
  expect(linkElement).toBeInTheDocument();
});
