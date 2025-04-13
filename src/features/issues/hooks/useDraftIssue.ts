import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { IssueFormValues } from "../types";

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
  initialValues?: IssueFormValues,
): UseFormReturn<IssueFormValues> => {
  const getInitialFormData = (): IssueFormValues => {
    const localData = localStorage.getItem(DRAFT_KEY);
    return localData ? JSON.parse(localData) : initialValues || initialEmptyForm;
  };

  const form = useForm<IssueFormValues>({
    defaultValues: getInitialFormData(),
  });

  useEffect(() => {
    const subscription = form.watch((data) => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return form;
};