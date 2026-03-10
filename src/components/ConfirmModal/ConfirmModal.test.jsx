import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConfirmModal from "./ConfirmModal";

describe("ConfirmModal", () => {
	test("calls confirm handler", async () => {
		const confirm = vi.fn();

		render(
			<ConfirmModal
				isOpen={true}
				message="Delete?"
				onConfirm={confirm}
				onCancel={() => {}}
			/>,
		);

		const confirmButton = await screen.findByText(/confirm/i);
		await userEvent.click(confirmButton);

		expect(confirm).toHaveBeenCalled();
	});
});
