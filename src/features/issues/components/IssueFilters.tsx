import { TextField, MenuItem, Box } from "@mui/material";
import { UserAvatar } from "@/features/users";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/features/users/api/user-api.ts";

export const IssueFilters = ({ boards, filters, onFilterChange }) => {
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return (
    <Box sx={{ mb: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
      <TextField
        label="Поиск по названию"
        value={filters.search}
        onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
        size="small"
      />

      <TextField
        select
        label="Статус"
        value={filters.status}
        onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
        size="small"
        sx={{ minWidth: 120 }}
      >
        <MenuItem value="">Все</MenuItem>
        <MenuItem value="Backlog">Бэклог</MenuItem>
        <MenuItem value="Todo">К выполнению</MenuItem>
        <MenuItem value="InProgress">В работе</MenuItem>
        <MenuItem value="Done">Готово</MenuItem>
      </TextField>

      <TextField
        select
        label="Проект"
        value={filters.board}
        onChange={(e) => onFilterChange({ ...filters, board: e.target.value })}
        size="small"
        sx={{ minWidth: 120 }}
      >
        <MenuItem value="">Все проекты</MenuItem>
        {boards.map((board) => (
          <MenuItem key={board.id} value={board.id}>
            {board.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Исполнитель"
        value={filters.assignee}
        onChange={(e) =>
          onFilterChange({ ...filters, assignee: e.target.value })
        }
        size="small"
        sx={{ minWidth: 140 }}
        renderValue={(selected) => (
          <UserAvatar user={users.find((u) => u.id === selected)} size={24} />
        )}
      >
        {users.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            <UserAvatar user={user} showName />
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};
