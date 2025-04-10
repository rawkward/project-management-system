import { Issue } from "../../types.ts";
import {createContext} from "react";

export type ModalState = {
  mode: "create" | "edit";
  initialData?: Partial<Issue>;
  currentBoardId?: number;
  sourcePage?: "boards" | "issues";
} | null;

export type IssueModalContextType = {
  modalState: ModalState;
  openModal: (
    mode: "create" | "edit",
    data?: {
      initialData?: Partial<Issue>;
      currentBoardId?: number;
      sourcePage?: "boards" | "issues";
    },
  ) => void;
  closeModal: () => void;
};

export const IssueModalContext = createContext<IssueModalContextType>({
  modalState: null,
  openModal: () => {},
  closeModal: () => {},
});
