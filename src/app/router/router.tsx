import { createBrowserRouter} from "react-router";
import { IssuesPage} from "@/features/issues/pages/IssuesPage.tsx";
import { Layout } from "@/app/layout/Layout.tsx";
//import { BoardsPage } from "@/features/boards/components/BoardsPage.tsx";
//import { BoardPage } from "@/features/boards/components/BoardPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "boards",
        element: <div />,
      },
      {
        path: "issues",
        element: <IssuesPage />,
      },
      {
        path: "boards/:id",
        element: <div />,
      },
    ],
  },
]);