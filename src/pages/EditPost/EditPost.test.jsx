import { describe, test } from "vitest";
import EditPost from "./EditPost";
import { renderWithRouter } from "../../tests/test-utils";

describe("EditPost Page", () => {
  test("renders edit post page", () => {
    renderWithRouter(<EditPost />);
  });
});
