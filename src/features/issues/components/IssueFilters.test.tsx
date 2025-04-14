import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IssueFilters } from "./IssueFilters";
import { Board } from "@/features/boards/types.ts";
import { vi } from "vitest";

vi.mock("./AdvancedFilters", () => ({
  AdvancedFilters: ({
    boards,
    statusFilter,
    boardFilter,
    onFilterChange,
  }: {
    boards: Board[];
    statusFilter: string;
    boardFilter: string;
    onFilterChange: (status: string, board: string) => void;
  }) => (
    <div data-testid="advanced-filters-mock">
      <button onClick={() => onFilterChange("Done", "1")}>
        Mock Change Filters
      </button>
      <div data-testid="status-filter">{statusFilter}</div>
      <div data-testid="board-filter">{boardFilter}</div>
      <ul>
        {boards.map((board) => (
          <li key={board.id}>{board.name}</li>
        ))}
      </ul>
    </div>
  ),
}));

const mockBoards: Board[] = [
  {
    id: 1,
    name: "Avito Frontend",
    description: "description",
    taskCount: 1,
  },
  {
    id: 2,
    name: "Backend API",
    description: "description",
    taskCount: 1,
  },
];

type IssueFilters = {
  search: string;
  status: string;
  board: string;
};

describe("IssueFilters", () => {
  const defaultFilters: IssueFilters = {
    search: "",
    status: "",
    board: "",
  };

  const defaultProps = {
    boards: mockBoards,
    filters: defaultFilters,
    onFilterChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render correctly with defaults", () => {
    render(<IssueFilters {...defaultProps} />);

    expect(screen.getByLabelText(/поиск/i)).toBeInTheDocument();
    expect(screen.getByTestId("advanced-filters-mock")).toBeInTheDocument();
    expect(screen.getByTestId("status-filter")).toHaveTextContent("");
    expect(screen.getByTestId("board-filter")).toHaveTextContent("");

    expect(screen.getByText("Avito Frontend")).toBeInTheDocument();
    expect(screen.getByText("Backend API")).toBeInTheDocument();
  });

  test("should call onFilterChange when typing", async () => {
    const user = userEvent.setup();

    let filters = { ...defaultFilters };

    const handleFilterChange = vi.fn((newFilters) => {
      filters = newFilters;
    });

    const { rerender } = render(
      <IssueFilters
        {...defaultProps}
        filters={filters}
        onFilterChange={handleFilterChange}
      />,
    );

    const searchInput = screen.getByLabelText(/поиск/i);
    await user.clear(searchInput);

    const inputText = "новая задача";

    for (const char of inputText) {
      await user.type(searchInput, char);

      rerender(
        <IssueFilters
          {...defaultProps}
          filters={filters}
          onFilterChange={handleFilterChange}
        />,
      );
    }

    expect(handleFilterChange).toHaveBeenCalledTimes(inputText.length);
    expect(filters.search).toBe(inputText);
  });

  test("should call onFilterChange on AdvanceFilters update", () => {
    render(<IssueFilters {...defaultProps} />);

    const advancedFilterBtn = screen.getByText("Mock Change Filters");
    fireEvent.click(advancedFilterBtn);

    expect(defaultProps.onFilterChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onFilterChange).toHaveBeenCalledWith({
      ...defaultFilters,
      status: "Done",
      board: "1",
    });
  });

  test("should correctly display filters", () => {
    const customFilters: IssueFilters = {
      search: "Backlog issue",
      status: "Backlog",
      board: "2",
    };

    render(<IssueFilters {...defaultProps} filters={customFilters} />);

    expect(screen.getByLabelText(/поиск/i)).toHaveValue(customFilters.search);
    expect(screen.getByTestId("status-filter")).toHaveTextContent(
      customFilters.status,
    );
    expect(screen.getByTestId("board-filter")).toHaveTextContent(
      customFilters.board,
    );
  });
});
