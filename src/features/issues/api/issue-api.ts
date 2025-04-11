import {
  ApiIssueResponse,
  ApiIssuesResponse,
  Issue,
  IssueFormValues,
} from "../types";
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

const mapFormPriorityToApi = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "high":
      return "High";
    case "medium":
      return "Medium";
    case "low":
      return "Low";
    default:
      return "Medium";
  }
};

const mapFormStatusToApi = (status: string) => {
  switch (status.toLowerCase()) {
    case "backlog":
      return "Backlog";
    case "todo":
      return "Todo";
    case "in_progress":
      return "InProgress";
    case "done":
      return "Done";
    default:
      return "Backlog";
  }
};

export const createIssue = async (data: IssueFormValues): Promise<number> => {
  const apiData = {
    ...convertFormValuesToApiData(data),
    priority: mapFormPriorityToApi(data.priority),
    status: mapFormStatusToApi(data.status),
  };

  const response = await apiClient<{ id: number }>("/tasks/create", {
    method: "POST",
    body: JSON.stringify(apiData),
  });
  return response.id;
};

export const updateIssue = async (
  id: number,
  data: IssueFormValues,
): Promise<void> => {
  const apiData = {
    ...convertFormValuesToApiData(data),
    priority: mapFormPriorityToApi(data.priority),
    status: mapFormStatusToApi(data.status),
  };

  await apiClient(`/tasks/update/${id}`, {
    method: "PUT",
    body: JSON.stringify(apiData),
  });
};

export const updateIssueStatus = async (
  id: number,
  newStatus: string,
): Promise<void> => {
  await apiClient(`/tasks/updateStatus/${id}`, {
    method: "PUT",
    body: JSON.stringify({ newStatus: mapFormStatusToApi(newStatus) }),
  });
};

const convertFormValuesToApiData = (data: IssueFormValues) => ({
  title: data.title,
  description: data.description || null,
  priority: data.priority,
  status: data.status,
  assigneeId: data.assigneeId || null,
  boardId: data.boardId,
});
