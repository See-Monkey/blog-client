import { vi } from "vitest";

export function mockAuth(overrides = {}) {
  return {
    isAuthenticated: false,
    isAdmin: false,
    logout: vi.fn(),
    user: null,
    ...overrides,
  };
}
