import { Grid } from "@mui/material";
import { IssueCard } from "@/shared/ui/card/IssueCard.tsx";
import { Issue } from "../types";

type IssuesListProps = {
  issues: Issue[];
  onIssueClick: (issue: Issue) => void;
};

export const IssuesList = ({ issues, onIssueClick }: IssuesListProps) => (
  <Grid container spacing={2} direction="column" sx={{ mt: 2 }}>
    {issues.map((issue) => (
      <Grid key={issue.id}>
        <IssueCard title={issue.title} onClick={() => onIssueClick(issue)} />
      </Grid>
    ))}
  </Grid>
);
