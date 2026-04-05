import { vi, describe, test, expect } from "vitest";
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

  test("header has edit when passed onSubmit only", async () => {
    const mockSubmit = vi.fn().mockResolvedValue();

    render(<PostEditor onSubmit={mockSubmit} />);

    expect(screen.getAllByText(/edit/i).length).toBeGreaterThan(0);
  });

  test("header has create when passed onPostCreated", async () => {
    const mockSubmit = vi.fn().mockResolvedValue();
    const mockCreated = vi.fn();

    render(<PostEditor onSubmit={mockSubmit} onPostCreated={mockCreated} />);

    expect(screen.getAllByText(/create/i).length).toBeGreaterThan(0);
  });

  test("calls onSubmit with correct data", async () => {
    const mockSubmit = vi.fn().mockResolvedValue();
    const mockCreated = vi.fn();

    render(<PostEditor onSubmit={mockSubmit} onPostCreated={mockCreated} />);

    const inputs = screen.getAllByRole("textbox");
    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button");

    await userEvent.type(inputs[0], "Test Title");
    await userEvent.type(inputs[1], "Test Content");
    await userEvent.click(checkbox); // toggle published
    await userEvent.click(button);

    expect(mockSubmit).toHaveBeenCalledWith({
      title: "Test Title",
      content: "Test Content",
      published: true,
    });
    expect(mockCreated).toHaveBeenCalled();
  });

  test("shows error when onSubmit rejects", async () => {
    const mockSubmit = vi.fn().mockRejectedValue(new Error("Failed"));

    render(<PostEditor onSubmit={mockSubmit} />);

    const inputs = screen.getAllByRole("textbox");
    await userEvent.type(inputs[0], "Test Title");
    await userEvent.type(inputs[1], "Test Content");

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(await screen.findByText(/failed/i)).toBeInTheDocument();
  });
});
