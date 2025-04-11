// features/issues/hooks/useDraftIssue.ts
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IssueFormValues } from '../types';
import {useLocation} from "react-router";

const DRAFT_KEY = 'issue-draft';

export const useDraftIssue = (issue?: IssueFormValues) => {
  const { pathname } = useLocation();
  const isCreatePage = pathname.includes('create');

  const form = useForm<IssueFormValues>({
    defaultValues: isCreatePage
      ? JSON.parse(localStorage.getItem(DRAFT_KEY) || {}
      : issue
  });

  useEffect(() => {
    if (isCreatePage) {
      const subscription = form.watch(values => {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
      });
      return () => subscription.unsubscribe();
    }
  }, [form, isCreatePage]);

  return form;
};