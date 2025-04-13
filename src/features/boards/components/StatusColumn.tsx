import { Card, CardContent, Typography, Box } from "@mui/material";
import { Issue } from "@/features/issues/types";

interface StatusColumnProps {
  status: string;
  issues: Issue[];
  onIssueClick: (issue: Issue) => void;
}

const statusLabels: Record<string, string> = {
  Backlog: "Backlog",
  Todo: "To do",
  InProgress: "In progress",
  Done: "Done",
};

export const StatusColumn = ({
  status,
  issues,
  onIssueClick,
}: StatusColumnProps) => (
  <Card variant="outlined" sx={{ height: "fit-content" }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {statusLabels[status]} ({issues.length})
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {issues.map((issue) => (
          <Card
            key={issue.id}
            onClick={() => onIssueClick(issue)}
            sx={{
              cursor: "pointer",
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <CardContent>
              <Typography>{issue.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {issue.boardName}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </CardContent>
  </Card>
);
