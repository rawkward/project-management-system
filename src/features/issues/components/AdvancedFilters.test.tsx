import { render, screen, fireEvent } from "@testing-library/react";
import { AdvancedFilters } from "./AdvancedFilters";
import { Board } from "@/features/boards/types.ts";
import { vi } from "vitest";

describe("AdvancedFilters", () => {
  const boards: Board[] = [
    { id: 1, name: "Project 1", description: "", taskCount: 0 },
    { id: 2, name: "Project 2", description: "", taskCount: 0 },
  ];

  it("should toggle filters visibility", () => {
    const mockFn = vi.fn();
    render(
      <AdvancedFilters
        boards={boards}
        statusFilter=""
        boardFilter=""
        onFilterChange={mockFn}
      />,
    );

    fireEvent.click(screen.getByText("Фильтры"));
    expect(screen.getByLabelText("Статус задачи")).toBeInTheDocument();
  });

  it("should apply status filter", async () => {
    const mockFn = vi.fn();
    render(
      <AdvancedFilters
        boards={boards}
        statusFilter=""
        boardFilter=""
        onFilterChange={mockFn}
      />,
    );

    fireEvent.click(screen.getByText("Фильтры"));

    fireEvent.mouseDown(screen.getByLabelText("Статус задачи"));

    fireEvent.click(screen.getByRole("option", { name: "In progress" }));

    expect(mockFn).toHaveBeenCalledWith("InProgress", "");
  });

  it("should apply board filter", async () => {
    const mockFn = vi.fn();
    render(
      <AdvancedFilters
        boards={boards}
        statusFilter=""
        boardFilter=""
        onFilterChange={mockFn}
      />,
    );

    fireEvent.click(screen.getByText("Фильтры"));

    fireEvent.mouseDown(screen.getByLabelText("Проект"));

    fireEvent.click(screen.getByRole("option", { name: "Project 1" }));

    expect(mockFn).toHaveBeenCalledWith("", "1");
  });
});
