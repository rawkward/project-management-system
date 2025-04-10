import "./App.css";
import { RouterProvider } from "react-router";
import { router } from "./app/router/router";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/app/layout/Layout.tsx";
import { IssueModal } from "@/features/issues/ui/IssueModal.tsx";
import { IssueModalProvider } from "@/features/issues/model/context/issueModalProvider.tsx";

function App() {
  return (
    <IssueModalProvider>
      <Layout>test</Layout>
    </IssueModalProvider>
  );
}

export default App;
