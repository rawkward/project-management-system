import { ApiIssue, Issue } from "@/features/issues/types.ts";

export const mapApiIssueToIssue = (apiIssue: ApiIssue): Issue => ({
  id: apiIssue.id,
  title: apiIssue.title,
  description: apiIssue.description,
  priority: apiIssue.priority.toLowerCase() as Issue["priority"],
  status: convertStatus(apiIssue.status),
  assigneeId: apiIssue.assigneeId,
  boardId: apiIssue.boardId,
  boardName: apiIssue.boardName,
});

const convertStatus = (status: ApiIssue["status"]): Issue["status"] => {
  switch (status) {
    case "Backlog": return "backlog";
    case "Todo": return "todo";
    case "InProgress": return "in_progress";
    case "Done": return "done";
    default:
      throw new Error(`Unknown status: ${status}`);
  }
};