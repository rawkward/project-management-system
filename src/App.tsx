import "./App.css";
import { RouterProvider } from "react-router";
import { router } from "./app/router/router";
import { useQuery } from "@tanstack/react-query";
import { IssueModalProvider } from "@/app/providers/IssueModalProvider.tsx";
import {Layout} from "@/app/layout/Layout.tsx";
import {IssueModal} from "@/features/issues/ui/IssueModal.tsx";

function App() {
  return (
    <>
    <IssueModalProvider />
      <Layout>sas</Layout>
      <IssueModal mode={'create'} onClose={() => {}} currentBoardId={undefined} initialData={{}}></IssueModal>
    </>
  );
}

export default App;
