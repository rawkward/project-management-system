import { Link } from "react-router";
import { AppBar, Button, Container, Toolbar } from "@mui/material";
import { useIssueModal } from "@/features/issues/hooks/useIssueModal.ts";

export const Header = () => {
  const { openModal } = useIssueModal();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Button component={Link} to="/issues" color="inherit">
            Все задачи
          </Button>
          <Button component={Link} to="/boards" color="inherit">
            Проекты
          </Button>
          <Button
            variant="contained"
            sx={{ ml: "auto" }}
            color="inherit"
            onClick={() => openModal("create")}
          >
            Создать задачу
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
