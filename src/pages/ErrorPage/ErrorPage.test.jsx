import { describe, test, expect } from "vitest";
import { screen } from "@testing-library/react";
import ErrorPage from "./ErrorPage";
import { renderWithRouter } from "../../tests/test-utils";

describe("ErrorPage", () => {
  test("renders error page", () => {
    renderWithRouter(<ErrorPage />);

    expect(screen.getByText(/exist/i)).toBeInTheDocument();
  });
});
