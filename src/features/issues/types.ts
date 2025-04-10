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
  priority: "high" | "medium" | "low";
  status: "backlog" | "todo" | "in_progress" | "done";
  assigneeId: number;
  boardId: number;
  boardName: string;
};

export type IssueFormValues = Omit<Issue, "id" | "boardName">;

export type Project = Pick<Issue, "id" | "boardName">;

export type Option = {
  value: string | number;
  label: string;
};