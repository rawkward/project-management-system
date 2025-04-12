import { ApiIssue, Issue } from "@/features/issues/types.ts";

export const mapApiIssueToIssue = (apiIssue: ApiIssue): Issue => ({
  id: apiIssue.id,
  title: apiIssue.title,
  description: apiIssue.description || "",
  priority: apiIssue.priority,
  status: apiIssue.status,
  assigneeId: apiIssue.assignee.id,
  boardId: apiIssue.boardId,
  boardName: apiIssue.boardName,
});
