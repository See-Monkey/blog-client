import { vi, describe, test, expect } from "vitest";
import { screen } from "@testing-library/react";
import Login from "./Login";
import { renderWithRouter } from "../../tests/test-utils";
import { mockAuth } from "../../tests/mocks/useAuth";

const useAuthMock = vi.fn();

vi.mock("../../context/useAuth.js", () => ({
  useAuth: () => useAuthMock(),
}));

describe("Login Page", () => {
  test("renders login form", () => {
    useAuthMock.mockReturnValue(mockAuth({ isAuthenticated: false }));

    renderWithRouter(<Login />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
