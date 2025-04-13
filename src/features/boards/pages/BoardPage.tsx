import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Box, CircularProgress, Typography } from "@mui/material";
import { StatusColumn } from "../components/StatusColumn";
import { fetchBoardIssues } from "../api/board-api";
import { Issue } from "@/features/issues/types";
import { useIssueModal } from "@/features/issues/hooks/useIssueModal.ts";
import { useBoard } from "@/features/boards/hooks/useBoard.ts";
import { IssueModal } from "@/features/issues/ui/IssueModal.tsx";

const STATUSES = ["Backlog", "InProgress", "Done"];

export const BoardPage = () => {
  const { id } = useParams<{ id: string }>();

  const { openModal, modalState, closeModal } = useIssueModal();

  const { data: board, isLoading } = useBoard(Number(id));

  const { data: issues = [] } = useQuery<Issue[]>({
    queryKey: ["board", id, "issues"],
    queryFn: () => fetchBoardIssues(Number(id)),
    refetchOnWindowFocus: false,
    refetchInterval: 60000,
  });

  if (isLoading) return <CircularProgress />;
  if (!board) return <p>Проект не найден</p>;

  const handleIssueClick = (issue: Issue) => {
    openModal("edit", {
      initialData: issue,
      currentBoardId: Number(id),
      sourcePage: "boards",
    });
  };

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        {board.name || "Проект"}
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
            onIssueClick={handleIssueClick} // используем handleIssueClick
          />
        ))}
      </Box>

      {modalState && (
        <IssueModal
          open={true}
          issue={modalState.initialData as Issue}
          sourcePage="boards"
          onClose={closeModal}
        />
      )}
    </div>
  );
};
