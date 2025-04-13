import { Card, CardContent, Typography, SxProps } from "@mui/material";

type IssueCardProps = {
  title: string;
  onClick: () => void;
  sx?: SxProps;
};

export const IssueCard = ({ title, onClick, sx }: IssueCardProps) => (
  <Card
    onClick={onClick}
    sx={{
      cursor: "pointer",
      border: "2px solid #ddd",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.2s",
      "&:hover": {
        transform: "scale(1.005)",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
      },
      ...sx,
    }}
  >
    <CardContent>
      <Typography variant="h6">{title}</Typography>
    </CardContent>
  </Card>
);
