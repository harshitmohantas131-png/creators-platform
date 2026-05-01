import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app without crashing", function () {
  render(<App />);
  expect(screen.getByRole("heading", { name: /home/i })).toBeInTheDocument();
});
