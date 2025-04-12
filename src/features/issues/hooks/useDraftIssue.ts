import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "react-router";
import { IssueFormValues } from "../types";
import { IssueSchema } from "@/features/issues/model/schema.ts";

const DRAFT_KEY = "issue-draft";

export const useDraftIssue = (issue?: IssueFormValues) => {
  const { pathname } = useLocation();
  const isCreatePage = pathname.includes("create");

  const draftString = localStorage.getItem(DRAFT_KEY);
  const draftValues = draftString ? JSON.parse(draftString) : {};

  const form = useForm<IssueFormValues>({
    defaultValues: isCreatePage ? (draftValues as IssueFormValues) : issue,
    resolver: zodResolver(IssueSchema)
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
