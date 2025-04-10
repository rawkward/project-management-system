// import { useIssueModal } from "@/features/issues/model/useIssueModal.ts";
// import { IssueModal } from "@/features/issues/ui/IssueModal.tsx";
//
// export const IssueModalProvider = () => {
//   const { modalState, closeModal } = useIssueModal();
//
//   if (!modalState || !modalState.mode) return null;
//
//   return modalState ? (
//     <IssueModal
//       mode={modalState.mode}
//       initialData={modalState.initialData}
//       currentBoardId={modalState.currentBoardId}
//       sourcePage={modalState.sourcePage}
//       onClose={closeModal}
//     />
//   ) : null;
// };
