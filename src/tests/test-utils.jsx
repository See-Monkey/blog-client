import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";

export function renderWithRouter(ui, options = {}) {
  return render(<MemoryRouter>{ui}</MemoryRouter>, options);
}
