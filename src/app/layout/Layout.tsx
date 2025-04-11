// src/app/layout/Layout.tsx
import { Header } from "@/shared/ui/header/Header";
import { ReactNode } from "react";
import { IssueModal } from "@/features/issues/ui/IssueModal.tsx";
import { useIssueModal } from "@/features/issues/hooks/useIssueModal.ts";

export const Layout = ({ children }: { children: ReactNode }) => {
  const { modalState, closeModal } = useIssueModal();

  return (
    <>
      <Header />
      <main>{children}</main>

      {modalState && (
        <IssueModal
          mode={modalState.mode}
          initialData={modalState.initialData}
          currentBoardId={modalState.currentBoardId}
          sourcePage={modalState.sourcePage}
          onClose={closeModal}
        />
      )}
    </>
  );
};
