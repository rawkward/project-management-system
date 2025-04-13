import { Box, Button, Collapse, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { Board } from "@/features/boards/types.ts";

interface AdvancedFiltersProps {
  boards: Board[];
  statusFilter: string;
  boardFilter: string;
  onFilterChange: (status: string, board: string) => void;
}

export const AdvancedFilters = ({
  boards,
  statusFilter,
  boardFilter,
  onFilterChange,
}: AdvancedFiltersProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ mb: 2 }}>
      <Button variant="outlined" onClick={() => setOpen(!open)}>
        Фильтры
      </Button>

      <Collapse in={open}>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
          <TextField
            select
            label="Статус задачи"
            value={statusFilter}
            onChange={(e) => onFilterChange(e.target.value, boardFilter)}
            size="small"
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">Все статусы</MenuItem>
            <MenuItem value="Backlog">To do</MenuItem>
            <MenuItem value="InProgress">In progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </TextField>

          <TextField
            select
            label="Проект"
            value={boardFilter}
            onChange={(e) => onFilterChange(statusFilter, e.target.value)}
            size="small"
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">Все проекты</MenuItem>
            {boards.map((board) => (
              <MenuItem key={board.id} value={board.id.toString()}>
                {board.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Collapse>
    </Box>
  );
};
