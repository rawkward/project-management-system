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

export const fetchIssue = async (id: number): Promise<Issue> => {
  const response = await apiClient<ApiIssueResponse>(`/tasks/${id}`);
  return mapApiIssueToIssue(response.data);
};

export const createIssue = async (data: IssueFormValues): Promise<number> => {
  const response = await apiClient<{ data: { id: number } }>("/tasks/create", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.data.id;
};

export const updateIssue = async (
  id: number,
  data: IssueFormValues,
): Promise<Issue> => {
  const response = await apiClient<ApiIssueResponse>(`/tasks/update/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return mapApiIssueToIssue(response.data);
};

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
      `/tasks/search?q=${encodeURIComponent(query)}`
    );
    return response.data.map(mapApiIssueToIssue);
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
};
