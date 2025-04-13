import { apiClient } from "@/shared/api/base-api";
import { ApiIssue, Issue } from "@/features/issues/types";
import { Board } from "@/features/boards/types.ts";

export const fetchBoards = async (): Promise<Board[]> => {
  const response = await apiClient<{ data: Board[] }>("/boards");
  return response.data;
};

export const fetchBoard = async (boardId: number) => {
  const response = await fetch(`/api/boards/${boardId}`);
  if (!response.ok) throw new Error("Failed to fetch board");
  return response.json();
};

export const fetchBoardIssues = async (boardId: number): Promise<Issue[]> => {
  const response = await apiClient<ApiIssue[]>(`/boards/${boardId}`);

  return response.map((issue) => ({
    id: issue.id,
    title: issue.title,
    description: issue.description || "",
    status: issue.status,
    priority: issue.priority,
    boardId: issue.boardId,
    boardName: issue.boardName,
    assigneeId: issue.assignee.id,
    assigneeFullName: issue.assignee.fullName,
  }));
};
