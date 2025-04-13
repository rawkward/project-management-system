import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IssueModal } from "./IssueModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";
import { Issue } from "@/features/issues/types.ts";

jest.mock("../api/issue-api", () => ({
  createIssue: jest.fn().mockResolvedValue(100),
  fetchIssue: jest.fn().mockResolvedValue({
    id: 100,
    title: "Новая задача",
    description: "",
    priority: "Medium",
    status: "Backlog",
    boardId: 2,
    assigneeId: 2,
    assigneeFullName: "Olga",
    boardName: "Backend API",
  }),
  updateIssue: jest.fn().mockResolvedValue({}),
}));

jest.mock("@/features/boards/api/board-api.ts", () => ({
  fetchBoards: jest.fn().mockResolvedValue([
    { id: 1, name: "Avito Frontend" },
    { id: 2, name: "Backend API" },
  ]),
}));

jest.mock("@/features/users/api/user-api.ts", () => ({
  fetchUsers: jest.fn().mockResolvedValue([
    { id: 1, fullName: "Ivan" },
    { id: 2, fullName: "Olga" },
  ]),
}));

const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactElement) =>
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>,
  );

const defaultProps = {
  open: true,
  onClose: jest.fn(),
};

describe("IssueModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders modal with default fields", async () => {
    renderWithProviders(<IssueModal {...defaultProps} />);

    expect(await screen.findByLabelText(/название/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/описание/i)).toBeInTheDocument();
    expect(screen.getByText(/создать задачу/i)).toBeInTheDocument();
  });

  it("creates new issue successfully", async () => {
    renderWithProviders(<IssueModal {...defaultProps} />);

    await userEvent.type(await screen.findByLabelText(/название/i), "New Task");
    await userEvent.type(screen.getByLabelText(/описание/i), "description...");

    fireEvent.mouseDown(screen.getByLabelText(/проект/i));
    fireEvent.click(await screen.findByText("Backend API"));

    fireEvent.mouseDown(screen.getByLabelText(/приоритет/i));
    fireEvent.click(screen.getByText("Высокий"));

    fireEvent.mouseDown(screen.getByLabelText(/статус/i));
    fireEvent.click(screen.getByText("In progress"));

    fireEvent.mouseDown(screen.getByLabelText(/исполнитель/i));
    fireEvent.click(await screen.findByText("Olga"));

    await userEvent.click(screen.getByText(/создать$/i));

    await waitFor(() => expect(defaultProps.onClose).toHaveBeenCalledTimes(1));
  });

  it("renders edit mode correctly", async () => {
    const existingIssue = {
      id: 1,
      title: "Old Task",
      description: "Old description",
      priority: "Medium",
      status: "Done",
      boardId: 1,
      boardName: "Avito Frontend",
      assigneeId: 1,
      assigneeFullName: "Ivan",
    } satisfies Issue;

    renderWithProviders(<IssueModal {...defaultProps} issue={existingIssue} />);

    expect(
      await screen.findByDisplayValue(existingIssue.title),
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(existingIssue.description),
    ).toBeInTheDocument();
    expect(screen.getByText(existingIssue.boardName)).toBeInTheDocument();
    expect(screen.getByText("Средний")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
    expect(
      screen.getByText(existingIssue.assigneeFullName),
    ).toBeInTheDocument();

    await userEvent.clear(screen.getByLabelText(/название/i));
    await userEvent.type(screen.getByLabelText(/название/i), "Updated Task");

    await userEvent.click(screen.getByText(/обновить/i));

    await waitFor(() => expect(defaultProps.onClose).toHaveBeenCalled());
  });
});
