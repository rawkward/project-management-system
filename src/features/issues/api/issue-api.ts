import { apiClient } from "@/shared/api/base-api";

export const fetchIssues = async () => apiClient("/tasks");
