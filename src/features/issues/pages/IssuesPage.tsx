import { useQuery } from "@tanstack/react-query";
import { Button, CircularProgress } from "@mui/material";
import { IssuesList } from "@/features/issues/components/IssuesList";
import { IssueFilters } from "@/features/issues/components/IssueFilters";
import { fetchIssues } from "@/features/issues/api/issue-api";
import { Issue } from "@/features/issues/types";
import { Board } from "@/features/boards/types.ts";
import { useIssueModal } from "@/features/issues/hooks/useIssueModal";
import { useState } from "react";
import { fetchBoards } from "@/features/boards/api/board-api.ts";

export const IssuesPage = () => {
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    board: "",
  });

  const { data: issues = [], isLoading } = useQuery<Issue[]>({
    queryKey: ["issues"],
    queryFn: fetchIssues,
  });

  const { data: boards = [] } = useQuery<Board[]>({
    queryKey: ["boards"],
    queryFn: fetchBoards,
  });

  const { openModal } = useIssueModal();

  const handleIssueClick = (issue: Issue) => {
    openModal("edit", {
      initialData: issue,
      sourcePage: "issues",
    });
  };

  const filteredIssues = issues.filter((issue) => {
    const searchLower = filters.search.toLowerCase();
    const statusMatch = filters.status ? issue.status === filters.status : true;
    const boardMatch = filters.board
      ? issue.boardId.toString() === filters.board
      : true;
    const titleMatch = issue.title.toLowerCase().includes(searchLower);
    const assigneeMatch = issue.assigneeFullName
      ?.toLowerCase()
      .includes(searchLower);

    return statusMatch && boardMatch && (titleMatch || assigneeMatch);
  });

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Все задачи</h1>
        <Button
          variant="contained"
          sx={{ mb: 5 }}
          onClick={() => openModal("create", { sourcePage: "issues" })}
        >
          Создать задачу
        </Button>
      </div>

      <IssueFilters
        boards={boards}
        filters={filters}
        onFilterChange={setFilters}
      />

      {isLoading ? (
        <CircularProgress />
      ) : (
        <IssuesList issues={filteredIssues} onIssueClick={handleIssueClick} />
      )}
    </div>
  );
};
