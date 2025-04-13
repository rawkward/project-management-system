import { render, screen } from "@testing-library/react";
import { StatusColumn } from "./StatusColumn";
import { Issue } from "@/features/issues/types";

const mockIssue: Issue = {
  id: 1,
  title: "Test Issue",
  status: "Backlog",
  priority: "Low",
  description: "Test description",
  boardId: 1,
  boardName: "Test Board",
  assigneeId: 1,
  assigneeFullName: "John Doe",
};

describe("StatusColumn", () => {
  it("should display correct status and count", () => {
    render(
      <StatusColumn
        status="Backlog"
        issues={[mockIssue]}
        onIssueClick={jest.fn()}
      />,
    );

    expect(screen.getByText("To do (1)")).toBeInTheDocument();
    expect(screen.getByText("Test Issue")).toBeInTheDocument();
  });
});
