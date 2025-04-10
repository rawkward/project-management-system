import { ApiIssuesResponse, ApiIssueResponse, Issue } from "../types";
import { mapApiIssueToIssue } from "@/features/issues/model/lib/mappers.ts";
import { apiClient } from "@/shared/api/base-api.ts";

export const fetchAllIssues = async (): Promise<Issue[]> => {
  const response = await apiClient<ApiIssuesResponse>("/tasks");
  return response.data.map(mapApiIssueToIssue);
};

export const fetchIssue = async (id: number): Promise<Issue> => {
  const response = await apiClient<ApiIssueResponse>(`/tasks/${id}`);
  return mapApiIssueToIssue(response.data);
};
