import { Header } from "@/shared/ui/header/Header";
import { ReactNode } from "react";
import { IssueModal } from "@/features/issues/ui/IssueModal.tsx";
import { useIssueModal } from "@/features/issues/hooks/useIssueModal.ts";
import { Issue } from "@/features/issues/types.ts";

export const Layout = ({ children }: { children: ReactNode }) => {
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
      <main>{children}</main>

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
