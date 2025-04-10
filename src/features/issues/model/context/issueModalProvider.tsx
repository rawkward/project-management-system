import {ReactNode, useState} from "react";
import {
  IssueModalContext,
  IssueModalContextType,
  ModalState,
} from "./issue-modal-context.ts";

export const IssueModalProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [modalState, setModalState] = useState<ModalState>(null);

  const openModal: IssueModalContextType["openModal"] = (mode, data = {}) => {
    setModalState({
      mode,
      ...data,
    });
  };

  const closeModal = () => {
    setModalState(null);
  };

  return (
    <IssueModalContext.Provider value={{ modalState, openModal, closeModal }}>
      {children}
    </IssueModalContext.Provider>
  );
};
