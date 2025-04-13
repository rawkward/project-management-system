import { render, screen } from "@testing-library/react";
import { IssuesPage } from "./IssuesPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: jest.fn().mockReturnValue({
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
