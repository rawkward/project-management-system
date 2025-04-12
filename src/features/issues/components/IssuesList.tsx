import { Grid, Card, CardContent, Typography } from "@mui/material";
import { Issue } from "../types";

type IssuesListProps = {
  issues: Issue[];
  onIssueClick: (issue: Issue) => void;
};

export const IssuesList = ({ issues, onIssueClick }: IssuesListProps) => (
  <Grid container spacing={2} direction="column" sx={{ mt: 2 }}>
    {issues.map((issue) => (
      <Grid key={issue.id}>
        <Card onClick={() => onIssueClick(issue)} sx={{ cursor: "pointer" }}>
          <CardContent>
            <Typography variant="h6">{issue.title}</Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);
