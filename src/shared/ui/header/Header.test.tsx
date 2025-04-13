import { render, screen } from "@testing-library/react";
import { Header } from "./Header";
import { MemoryRouter } from "react-router";

describe("Header", () => {
  it("should render navigation links", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByText(/все задачи/i)).toBeInTheDocument();
    expect(screen.getByText(/проекты/i)).toBeInTheDocument();
    expect(screen.getByText(/создать задачу/i)).toBeInTheDocument();
  });

  it("should highlight active link", () => {
    render(
      <MemoryRouter initialEntries={["/issues"]}>
        <Header />
      </MemoryRouter>,
    );

    const issuesLink = screen.getByText(/все задачи/i);
    expect(issuesLink).toHaveStyle("font-weight: 700");
  });
});
