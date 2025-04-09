import { useIssueModal } from "@/features/issues/model/useIssueModal.ts";
import { IssueModal } from "@/features/issues/ui/IssueModal.tsx";

export const TaskModalProvider = () => {
  const { modalState, closeModal } = useIssueModal();

  return modalState ? (
    <IssueModal
      mode={modalState.mode}
      initialData={modalState.initialData}
      currentBoardId={modalState.currentBoardId}
      sourcePage={modalState.sourcePage}
      onClose={closeModal}
    />
  ) : null;
};
