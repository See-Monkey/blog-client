import { vi, describe, test, expect } from "vitest";
import { screen } from "@testing-library/react";
import Register from "./Register";
import { renderWithRouter } from "../../tests/test-utils";
import { mockAuth } from "../../tests/mocks/useAuth";

const useAuthMock = vi.fn();

vi.mock("../../context/useAuth.js", () => ({
	useAuth: () => useAuthMock(),
}));

describe("Register Page", () => {
	test("renders register form", () => {
		useAuthMock.mockReturnValue(mockAuth({ isAuthenticated: false }));

		renderWithRouter(<Register />);

		expect(screen.getByRole("button")).toBeInTheDocument();
	});
});
