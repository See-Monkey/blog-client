import { vi, describe, test } from "vitest";
import Posts from "./Posts";
import { renderWithRouter } from "../../tests/test-utils";
import { mockAuth } from "../../tests/mocks/useAuth";

const useAuthMock = vi.fn();

vi.mock("../../context/useAuth.js", () => ({
  useAuth: () => useAuthMock(),
}));

describe("Posts Page", () => {
  test("renders posts page", () => {
    useAuthMock.mockReturnValue(mockAuth({ isAuthenticated: false }));
    renderWithRouter(<Posts />);
  });
});
