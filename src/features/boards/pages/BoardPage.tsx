import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Box, CircularProgress, Typography } from "@mui/material";
import { StatusColumn } from "../components/StatusColumn";
import { fetchBoard, fetchBoardIssues } from "../api/board-api";
import { Issue } from "@/features/issues/types";
import { IssueModal } from "@/features/issues/ui/IssueModal";
import { useState } from "react";

const STATUSES = ["Backlog", "Todo", "InProgress", "Done"];

export const BoardPage = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const { data: board, isLoading: boardLoading } = useQuery({
    queryKey: ["board", id],
    queryFn: () => fetchBoard(Number(id)),
  });

  const { data: issues = [], isLoading: issuesLoading } = useQuery<Issue[]>({
    queryKey: ["board", id, "issues"],
    queryFn: () => fetchBoardIssues(Number(id)),
    refetchOnWindowFocus: false,
  });

  if (boardLoading || issuesLoading) return <CircularProgress />;

  //TODO: разобраться с :id борды

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
