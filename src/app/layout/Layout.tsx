import { Header } from "@/shared/ui/header/Header";
import { IssueModal } from "@/features/issues/ui/IssueModal.tsx";
import { useIssueModal } from "@/features/issues/hooks/useIssueModal.ts";
import { Issue } from "@/features/issues/types.ts";
import { Outlet } from "react-router";

export const Layout = () => {
  const { modalState, closeModal } = useIssueModal();

  const defaultIssue: Issue = {
    id: 0,
    title: "",
    description: "",
    priority: "Low",
    status: "Backlog",
    assigneeId: 0,
    boardId: 0,
    boardName: "",
  };

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>

      {modalState && (
        <IssueModal
          open={true}
          issue={
            modalState.initialData
              ? { ...defaultIssue, ...modalState.initialData }
              : undefined
          }
          sourcePage={modalState.sourcePage}
          onClose={closeModal}
        />
      )}
    </>
  );
};
