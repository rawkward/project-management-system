// Базовый тип ответа API
type ApiResponse<T> = {
  data: T;
};

// Полная структура задачи из API
export type ApiIssue = {
  id: number;
  title: string;
  description?: string;
  priority: "High" | "Medium" | "Low";
  status: "Backlog" | "Todo" | "InProgress" | "Done";
  assigneeId: number;
  assignee: {
    id: number;
    fullName: string;
    email: string;
    avatarUrl: string;
  };
  boardId: number;
  boardName: string;
};

// Ответы API
export type ApiIssueResponse = ApiResponse<ApiIssue>;
export type ApiIssuesResponse = ApiResponse<ApiIssue[]>;

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

export type IssueFormValues = {
  title: string;
  description?: string;
  priority: "high" | "medium" | "low";
  status: "backlog" | "todo" | "in_progress" | "done";
  assigneeId: number;
  boardId: number;
};