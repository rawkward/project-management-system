// Базовый тип ответа API
export type ApiResponse<T> = {
  data: T;
};

// Ответы API
export type ApiIssueResponse = ApiResponse<ApiIssue>;
export type ApiIssuesResponse = ApiResponse<ApiIssue[]>;

type ApiAssignee = {
  id: number;
  fullName: string;
  email: string;
  avatarUrl: string;
};

export type ApiIssue = {
  id: number;
  title: string;
  description?: string;
  priority: "High" | "Medium" | "Low";
  status: "Backlog" | "Todo" | "InProgress" | "Done";
  assignee: ApiAssignee;
  boardId: number;
  boardName: string;
};

export type Issue = {
  id: number;
  title: string;
  description?: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Backlog' | 'Todo' | 'InProgress' | 'Done';
  assigneeId: number;
  boardId: number;
  boardName: string;
};

export type IssueFormValues = {
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'backlog' | 'todo' | 'in_progress' | 'done';
  assigneeId?: number | null;
  boardId: number;
};

export type Board = {
  id: number;
  name: string;
};

export type User = {
  id: number;
  fullName: string;
  avatarUrl: string;
};

export type Option = {
  value: string | number;
  label: string;
};