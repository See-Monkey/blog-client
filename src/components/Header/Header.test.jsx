import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
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

  test("shows Dashboard link when user is admin", () => {
    useAuthMock.mockReturnValue(
      mockAuth({ isAuthenticated: true, isAdmin: true }),
    );

    renderWithRouter(<Header />);

    const dashboardLink = screen.getByText(/dashboard/i);

    expect(dashboardLink).toBeInTheDocument();
  });

  test("does not show Dashboard link when user is not admin", () => {
    useAuthMock.mockReturnValue(
      mockAuth({ isAuthenticated: true, isAdmin: false }),
    );

    renderWithRouter(<Header />);

    const dashboardLink = screen.queryByText(/dashboard/i);

    expect(dashboardLink).toBeNull();
  });

  beforeEach(() => {
    useAuthMock.mockReturnValue(mockAuth({ isAuthenticated: false }));
  });

  test("highlights Home link when on home page", () => {
    useAuthMock.mockReturnValue(mockAuth({ isAuthenticated: false }));

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>,
    );

    const homeLink = screen.getByText(/home/i);
    const postsLink = screen.getByText(/posts/i);

    expect(homeLink.className).toMatch(/active/); // Home should be active
    expect(postsLink.className).not.toMatch(/active/); // Posts should not
  });

  test("highlights Posts link when on posts page", () => {
    useAuthMock.mockReturnValue(mockAuth({ isAuthenticated: false }));

    render(
      <MemoryRouter initialEntries={["/posts"]}>
        <Header />
      </MemoryRouter>,
    );

    const homeLink = screen.getByText(/home/i);
    const postsLink = screen.getByText(/posts/i);

    expect(postsLink.className).toMatch(/active/); // Posts should be active
    expect(homeLink.className).not.toMatch(/active/); // Home should not
  });
});
