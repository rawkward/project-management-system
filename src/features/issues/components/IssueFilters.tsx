// src/features/issues/components/IssueFilters.tsx
import { Box, TextField } from "@mui/material";
import { AdvancedFilters } from "./AdvancedFilters";
import { Board } from "@/features/boards/types.ts";

type IssueFiltersProps = {
  boards: Board[];
  filters: {
    search: string;
    status: string;
    board: string;
  };
  onFilterChange: (filters: {
    search: string;
    status: string;
    board: string;
  }) => void;
};

export const IssueFilters = ({
  boards,
  filters,
  onFilterChange,
}: IssueFiltersProps) => {
  const handleAdvancedFilterChange = (status: string, board: string) => {
    onFilterChange({
      ...filters,
      status,
      board,
    });
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Поиск"
          value={filters.search}
          onChange={(e) =>
            onFilterChange({ ...filters, search: e.target.value })
          }
          fullWidth
          size="small"
        />
      </Box>

      <AdvancedFilters
        boards={boards}
        statusFilter={filters.status}
        boardFilter={filters.board}
        onFilterChange={handleAdvancedFilterChange}
      />
    </Box>
  );
};
