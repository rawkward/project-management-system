export type Issue = {
  id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in_progress" | "done";
  assigneeId?: string;
  boardId?: string;
  createdAt: Date;
};

export type IssueFormValues = Omit<Issue, "id" | "createdAt">;

export type PriorityOption = {
  value: Issue["priority"];
  label: string;
};

export type StatusOption = {
  value: Issue["status"];
  label: string;
};

export type AssigneeOption = {
  value: string;
  label: string;
};