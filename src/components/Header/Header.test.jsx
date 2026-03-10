import { describe, test, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import Header from "./Header";
import { renderWithRouter } from "../../tests/test-utils";
import { mockAuth } from "../../tests/mocks/useAuth.js";

const useAuthMock = vi.fn();

vi.mock("../../context/useAuth.js", () => ({
	useAuth: () => useAuthMock(),
}));

describe("Header", () => {
	test("renders login/register when unauthenticated", () => {
		useAuthMock.mockReturnValue(mockAuth({ isAuthenticated: false }));

		renderWithRouter(<Header />);

		expect(screen.getByText(/login/i)).toBeInTheDocument();
		expect(screen.getByText(/register/i)).toBeInTheDocument();
	});

	test("renders logout when authenticated", () => {
		useAuthMock.mockReturnValue(mockAuth({ isAuthenticated: true }));

		renderWithRouter(<Header />);

		expect(screen.getByText(/logout/i)).toBeInTheDocument();
	});
});
