import { Link } from "react-router";

export const Header = () => {
  return (
    <header>
      <Link to="/issues">Все задачи</Link>
      <Link to="/boards">Проекты</Link>
    </header>
  );
};
