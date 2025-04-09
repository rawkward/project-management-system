import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "boards",
        element: <BoardsPage />,
      },
      {
        path: "issues",
        element: <IssuesPage />,
      },
      {
        path: "boards/:id",
        element: <BoardPage />,
      },
    ],
  },
]);
