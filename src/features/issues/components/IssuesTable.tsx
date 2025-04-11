import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import { formatDate, UserAvatar } from "@/shared/lib";
import { Link } from "react-router";

const StatusChip = ({ status }) => {
  const statusColors = {
    Backlog: "default",
    Todo: "info",
    InProgress: "warning",
    Done: "success",
  };

  return <Chip label={status} color={statusColors[status]} size="small" />;
};

export const IssuesTable = ({ issues, onRowClick }) => (
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
          <TableCell>
            <UserAvatar user={issue.assignee} showName />
          </TableCell>
          <TableCell>{formatDate(issue.createdAt)}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
