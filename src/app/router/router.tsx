import { createBrowserRouter } from "react-router";
import { Layout } from "@/app/layout/Layout";
import { BoardsPage } from "@/features/boards/pages/BoardsPage";
import { BoardPage } from "@/features/boards/pages/BoardPage";
import { IssuesPage } from "@/features/issues/pages/IssuesPage";
import { queryClient } from "@/app/providers/queryClient.ts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <BoardsPage />,
        loader: () => {
          queryClient.cancelQueries();
          return null;
        },
      },
      {
        path: "boards",
        element: <BoardsPage />,
        loader: () => {
          queryClient.cancelQueries();
          return null;
        },
      },
      {
        path: "issues",
        element: <IssuesPage />,
        loader: () => {
          queryClient.cancelQueries();
          return null;
        },
      },
      {
        path: "boards/:id",
        element: <BoardPage />,
        loader: () => {
          queryClient.cancelQueries();
          return null;
        },
      },
    ],
  },
]);
