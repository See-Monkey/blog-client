import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PostEditor from "./PostEditor";

describe("PostEditor", () => {
	test("renders editor", () => {
		render(<PostEditor />);
		expect(screen.getAllByRole("textbox").length).toBeGreaterThan(1);
	});

	test("allows typing", async () => {
		render(<PostEditor />);

		const input = screen.getAllByRole("textbox");

		await userEvent.type(input[0], "hello");

		expect(input[0]).toHaveValue("hello");
	});
});
