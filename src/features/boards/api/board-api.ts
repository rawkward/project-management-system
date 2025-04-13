import { apiClient } from "@/shared/api/base-api";
import { ApiIssue, Issue } from "@/features/issues/types";
import { Board } from "@/features/boards/types.ts";
import { mapApiIssueToIssue } from "@/features/issues/model/lib/mappers.ts";

export const fetchBoards = async (): Promise<Board[]> => {
  const response = await apiClient<{ data: Board[] }>("/boards");
  return response.data;
};

export const fetchBoard = async (boardId: number): Promise<Board> => {
  const response = await apiClient<{ data: Board }>(`/boards/${boardId}`);
  return response.data;
};

export const fetchBoardIssues = async (boardId: number): Promise<Issue[]> => {
  const response = await apiClient<{ data: ApiIssue[] }>(`/boards/${boardId}`);
  return response.data.map(mapApiIssueToIssue);
};
