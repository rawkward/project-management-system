import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Box, CircularProgress, Typography } from "@mui/material";
import { StatusColumn } from "../components/StatusColumn";
import { fetchBoardIssues } from "../api/board-api";
import { Issue } from "@/features/issues/types";
import { IssueModal } from "@/features/issues/ui/IssueModal";
import { useState } from "react";
import { useBoard } from "@/features/boards/hooks/useBoard.ts";

const STATUSES = ["Todo", "InProgress", "Done"];

export const BoardPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: board, isLoading } = useBoard(Number(id));

  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const { data: issues = [] } = useQuery<Issue[]>({
    queryKey: ["board", id, "issues"],
    queryFn: () => fetchBoardIssues(Number(id)),
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <CircularProgress />;

  if (!board) return <p>Проект не найден</p>;

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        {board?.name || "Проект"}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 3,
          border: "1px solid #e0e0e0",
          borderRadius: "4px",
        }}
      >
        {STATUSES.map((status) => (
          <StatusColumn
            key={status}
            status={status}
            issues={issues.filter((issue) => issue.status === status)}
            onIssueClick={setSelectedIssue}
          />
        ))}
      </Box>

      <IssueModal
        open={!!selectedIssue}
        issue={selectedIssue}
        onClose={() => setSelectedIssue(null)}
        sourcePage="boards"
      />
    </div>
  );
};
