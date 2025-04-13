import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IssueFormValues } from "../types";
import { IssueSchema } from "@/features/issues/model/schema.ts";

export const DRAFT_KEY = "issueDraft";

export const initialEmptyForm: IssueFormValues = {
  title: "",
  description: "",
  priority: "Low",
  status: "Backlog",
  boardId: 0,
  assigneeId: 0,
};

export const useDraftIssue = (
  issue?: IssueFormValues | null,
): UseFormReturn<IssueFormValues> => {
  const isEditMode = Boolean(issue?.title);

  const getInitialFormData = (): IssueFormValues => {
    if (isEditMode) {
      return issue as IssueFormValues;
    }

    const localData = localStorage.getItem(DRAFT_KEY);

    return localData ? JSON.parse(localData) : initialEmptyForm;
  };

  const form = useForm<IssueFormValues>({
    defaultValues: getInitialFormData(),
    resolver: zodResolver(IssueSchema), // Добавьте zodResolver здесь
  });

  useEffect(() => {
    if (isEditMode) return;

    const subscription = form.watch((data) => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    });

    return () => subscription.unsubscribe();
  }, [form, isEditMode]);

  return form;
};
