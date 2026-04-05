import { describe, test } from "vitest";
import Account from "./Account";
import { renderWithRouter } from "../../tests/test-utils";

describe("Account Page", () => {
  test("renders account page", () => {
    renderWithRouter(<Account />);
  });
});
