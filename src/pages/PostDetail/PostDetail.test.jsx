import { vi, describe, test } from "vitest";
import PostDetail from "./PostDetail";
import { renderWithRouter } from "../../tests/test-utils";
import { mockAuth } from "../../tests/mocks/useAuth";

const useAuthMock = vi.fn();

vi.mock("../../context/useAuth.js", () => ({
	useAuth: () => useAuthMock(),
}));

describe("PostDetail Page", () => {
	test("renders post detail page", () => {
		useAuthMock.mockReturnValue(mockAuth({ isAuthenticated: false }));
		renderWithRouter(<PostDetail />);
	});
});
