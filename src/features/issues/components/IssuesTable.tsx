import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
//import { UserAvatar } from "@/shared/lib";
import { Link } from "react-router";
import { ApiIssue } from "@/features/issues/types.ts";

type IssuesTableProps = {
  issues: ApiIssue[];
  onRowClick: (issue: ApiIssue) => void;
};

interface StatusChipProps {
  status: ApiIssue["status"];
}

const StatusChip = ({ status }: StatusChipProps) => {
  const statusColors: Record<
    ApiIssue["status"],
    "default" | "info" | "warning" | "success"
  > = {
    Backlog: "default",
    Todo: "info",
    InProgress: "warning",
    Done: "success",
  };

  return <Chip label={status} color={statusColors[status]} size="small" />;
};

export const IssuesTable = ({ issues, onRowClick }: IssuesTableProps) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Название</TableCell>
        <TableCell>Статус</TableCell>
        <TableCell>Проект</TableCell>
        <TableCell>Исполнитель</TableCell>
        <TableCell>Дата создания</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {issues.map((issue) => (
        <TableRow
          key={issue.id}
          hover
          onClick={() => onRowClick(issue)}
          sx={{ cursor: "pointer" }}
        >
          <TableCell>{issue.title}</TableCell>
          <TableCell>
            <StatusChip status={issue.status} />
          </TableCell>
          <TableCell>
            <Link
              to={`/boards/${issue.boardId}`}
              onClick={(e) => e.stopPropagation()}
            >
              {issue.boardName}
            </Link>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
