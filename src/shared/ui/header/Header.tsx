import { Link, useLocation } from "react-router";
import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import { useIssueModal } from "@/features/issues/hooks/useIssueModal.ts";

export const Header = () => {
  const { openModal } = useIssueModal();
  const location = useLocation();

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              component={Link}
              to="/issues"
              color="inherit"
              sx={{
                fontWeight: location.pathname === "/issues" ? "bold" : "normal",
              }}
            >
              Все задачи
            </Button>
            <Button
              component={Link}
              to="/boards"
              color="inherit"
              sx={{
                fontWeight: location.pathname === "/boards" ? "bold" : "normal",
              }}
            >
              Проекты
            </Button>
          </Box>

          <Button color="inherit" onClick={() => openModal("create")}>
            Создать задачу
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
