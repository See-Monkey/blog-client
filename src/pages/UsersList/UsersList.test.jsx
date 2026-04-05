import { vi, describe, test } from "vitest";
import UsersList from "./UsersList";
import { renderWithRouter } from "../../tests/test-utils";

const useAuthMock = vi.fn();

vi.mock("../../context/useAuth.js", () => ({
  useAuth: () => useAuthMock(),
}));

describe("UsersList Page", () => {
  test("renders users list", () => {
    renderWithRouter(<UsersList />);
  });
});
