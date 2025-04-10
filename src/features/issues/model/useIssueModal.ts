import {useState} from "react";
import { Issue } from "../types";
import {useLocation, useParams} from "react-router";

type ModalState = {
  mode: "create" | "edit";
  initialData?: Partial<Issue>;
  currentBoardId?: string;
  sourcePage?: "boards" | "issues";
} | null;

export const useIssueModal = () => {
  const [modalState, setModalState] = useState<ModalState>(null);

  const location = useLocation();
  const currentBoardId = useParams().boardId;

  const openModal = (mode: "create" | "edit", data?: Partial<Issue>) => {
    setModalState({ mode, initialData: data });
  };

  const closeModal = () => setModalState(null);

  const sourcePage: "boards" | "issues" = location.pathname.includes("boards") ? "boards" : "issues";

  return {
    modalState: {
      ...modalState,
      sourcePage,
      currentBoardId,
    },
    openModal,
    closeModal,
  };
};