import { useContext } from "react";
import { IssueModalContext } from "@/features/issues/model/context/issue-modal-context.ts";

export const useIssueModal = () => useContext(IssueModalContext);
