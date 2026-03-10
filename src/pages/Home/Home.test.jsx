import { describe, test, expect } from "vitest";
import { screen } from "@testing-library/react";
import Home from "./Home";
import { renderWithRouter } from "../../tests/test-utils";

describe("Home Page", () => {
	test("renders home page", () => {
		renderWithRouter(<Home />);

		expect(screen.getByText(/welcome/i)).toBeInTheDocument();
	});
});
