import {
  ApiIssueResponse,
  ApiIssuesResponse,
  Issue,
  IssueFormValues,
} from "../types";
import { mapApiIssueToIssue } from "@/features/issues/model/lib/mappers.ts";
import { apiClient } from "@/shared/api/base-api.ts";

export const fetchIssues = async (): Promise<Issue[]> => {
  const response = await apiClient<ApiIssuesResponse>("/tasks");
  return response.data.map(mapApiIssueToIssue);
};

export async function fetchIssue(id: number, boardId: number): Promise<Issue> {
  const response = await apiClient<ApiIssueResponse>(`/tasks/${id}`);
  const apiIssue = response.data;

  return mapApiIssueToIssue({
    ...apiIssue,
    boardId,
  });
}

export const createIssue = async (data: IssueFormValues): Promise<number> => {
  const response = await apiClient<{ data: { id: number } }>("/tasks/create", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.data.id;
};

export async function updateIssue(
  id: number,
  data: IssueFormValues,
): Promise<void> {
  await apiClient(`/tasks/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export const updateIssueStatus = async (
  id: number,
  newStatus: string,
): Promise<void> => {
  await apiClient(`/tasks/updateStatus/${id}`, {
    method: "PUT",
    body: JSON.stringify({ newStatus }),
  });
};

export const searchIssues = async (query: string): Promise<Issue[]> => {
  try {
    const response = await apiClient<ApiIssuesResponse>(
      `/tasks/search?q=${encodeURIComponent(query)}`,
    );
    return response.data.map(mapApiIssueToIssue);
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
};
