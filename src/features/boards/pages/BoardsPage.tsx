import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { fetchBoards } from "../api/board-api";

export const BoardsPage = () => {
  const { data: boards = [], isLoading } = useQuery({
    queryKey: ["boards"],
    queryFn: fetchBoards,
  });

  if (isLoading) return <CircularProgress />;

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        Все проекты
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {boards.map((board) => (
          <Card
            key={board.id}
            component={Link}
            to={`/boards/${board.id}`}
            sx={{
              textDecoration: "none",
              "&:hover": { boxShadow: 3 },
              mb: 2,
            }}
          >
            <CardContent
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="h6">{board.name}</Typography>
              <Typography variant="button" display="block">
                Перейти к доске
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
};
