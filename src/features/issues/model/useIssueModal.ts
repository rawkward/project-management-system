import {useState} from "react";
import { Issue } from "../types";
import {useLocation, useParams} from "react-router";

export const useIssueModal = () => {
  const [modalState, setModalState] = useState<{
    mode: "create" | "edit";
    initialData?: Partial<Issue>;
  } | null>(null);

  const location = useLocation();
  const currentBoardId = useParams().boardId;

  const openModal = (mode: "create" | "edit", data?: Partial<Issue>) => {
    setModalState({ mode, initialData: data });
  };

  const closeModal = () => setModalState(null);

  return {
    modalState: {
      ...modalState,
      sourcePage: location.pathname.includes("boards") ? "boards" : "issues",
      currentBoardId,
    },
    openModal,
    closeModal,
  };
};