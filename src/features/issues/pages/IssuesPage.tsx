import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, CircularProgress } from "@mui/material";
import { IssuesTable } from "@/features/issues/components/IssuesTable.tsx";
import { IssueFilters } from "@/features/issues/components/IssueFilters.tsx";

import { fetchIssues, searchIssues } from "@/features/issues/api/issue-api.ts";
import { fetchBoards } from "@/features/boards/api/board-api.ts";
import { Issue, Board } from "@/features/issues/types.ts"; // Обратите внимание на используемый тип
import { Link } from "react-router";
import { IssueModal } from "@/features/issues/ui/IssueModal.tsx";

export const IssuesPage = () => {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    board: "",
    assignee: "",
  });

  const { data: issues = [], isLoading } = useQuery<Issue[]>({
    queryKey: ["issues", filters],
    queryFn: () =>
      filters.search ? searchIssues(filters.search) : fetchIssues(),
    select: (data) =>
      data.filter(
        (issue) =>
          (filters.status ? issue.status === filters.status : true) &&
          (filters.board ? issue.boardId === Number(filters.board) : true) &&
          (filters.assignee ? issue.assigneeId === Number(filters.assignee) : true),
      ),
  });

  const { data: boards = [] } = useQuery<Board[]>({
    queryKey: ["boards"],
    queryFn: fetchBoards,
  });

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Все задачи</h1>
        <Button variant="contained" component={Link} to="?modal=create">
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
        <IssuesTable issues={issues} onRowClick={setSelectedIssue} />
      )}

      <IssueModal
        open={!!selectedIssue}
        issue={selectedIssue}
        onClose={() => setSelectedIssue(null)}
        sourcePage="issues"
      />
    </div>
  );
};