import {useEffect, useMemo} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "react-router";
import { IssueFormValues } from "../types";
import { IssueSchema } from "@/features/issues/model/schema.ts";

// src/features/issues/hooks/useDraftIssue.ts
export const DRAFT_KEY = "issue-draft";

const initialEmptyForm: IssueFormValues = {
  title: "",
  description: "",
  priority: "Low",
  status: "Backlog",
  boardId: 0,
  assigneeId: 0,
};

export const useDraftIssue = (issue?: IssueFormValues) => {
  const { pathname } = useLocation();
  const isCreatePage = pathname.includes("create");
  const draftValues = useMemo(() => {
    const draft = localStorage.getItem(DRAFT_KEY);
    return draft ? JSON.parse(draft) : {};
  }, []);

  const form = useForm<IssueFormValues>({
    defaultValues: isCreatePage
      ? { ...initialEmptyForm, ...draftValues }
      : issue || initialEmptyForm,
    resolver: zodResolver(IssueSchema),
  });

  useEffect(() => {
    if (isCreatePage) {
      const subscription = form.watch((values) => {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
      });
      return () => subscription.unsubscribe();
    }
  }, [form, isCreatePage]);

  return form;
};
