import { render, screen } from "@testing-library/react";
import { IssuesPage } from "./IssuesPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi } from "vitest";

const queryClient = new QueryClient();

vi.mock("@tanstack/react-query", async () => ({
  ...((await vi.importActual("@tanstack/react-query")) as object),
  useQuery: vi.fn().mockReturnValue({
    data: [],
    isLoading: false,
  }),
}));

describe("IssuesPage", () => {
  it("should render filters and create button", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <IssuesPage />
      </QueryClientProvider>,
    );

    expect(screen.getByLabelText("Поиск")).toBeInTheDocument();
    expect(screen.getByText("Создать задачу")).toBeInTheDocument();
  });
});
