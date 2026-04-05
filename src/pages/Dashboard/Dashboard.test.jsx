import { describe, test } from "vitest";
import Dashboard from "./Dashboard";
import { renderWithRouter } from "../../tests/test-utils";

describe("Dashboard Page", () => {
  test("renders dashboard", () => {
    renderWithRouter(<Dashboard />);
  });
});
