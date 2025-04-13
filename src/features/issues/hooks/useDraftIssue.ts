import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IssueFormValues } from "../types";
import { IssueSchema } from "@/features/issues/model/schema.ts";

export const DRAFT_KEY = "issue-draft";

export const initialEmptyForm: IssueFormValues = {
  title: "",
  description: "",
  priority: "Low",
  status: "Backlog",
  boardId: 0,
  assigneeId: 0,
};

export const useDraftIssue = (issue?: IssueFormValues) => {
  const isCreate = !issue;

  const draftValues = useMemo(() => {
    const draft = localStorage.getItem(DRAFT_KEY);
    return draft ? JSON.parse(draft) : {};
  }, []);

  const form = useForm<IssueFormValues>({
    defaultValues: isCreate
      ? { ...initialEmptyForm, ...draftValues }
      : { ...initialEmptyForm, ...issue },
    resolver: zodResolver(IssueSchema),
  });

  useEffect(() => {
    if (isCreate) {
      const subscription = form.watch((values) => {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
      });
      return () => subscription.unsubscribe();
    }
  }, [form, isCreate]);

  return form;
};
