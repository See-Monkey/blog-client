import { vi, describe, test } from "vitest";
import UserProfile from "./UserProfile";
import { renderWithRouter } from "../../tests/test-utils";
import { mockAuth } from "../../tests/mocks/useAuth";

const useAuthMock = vi.fn();

vi.mock("../../context/useAuth.js", () => ({
  useAuth: () => useAuthMock(),
}));

describe("UserProfile Page", () => {
  test("renders profile page", () => {
    useAuthMock.mockReturnValue(
      mockAuth({ isAuthenticated: true, user: { name: "Alice" } }),
    );
    renderWithRouter(<UserProfile />);
  });
});

describe("UserProfile Page", () => {
  test("renders profile page", () => {
    renderWithRouter(<UserProfile />);
  });
});
