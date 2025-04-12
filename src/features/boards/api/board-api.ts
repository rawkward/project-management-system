import { ApiResponse } from "@/features/issues/types.ts";
import { apiClient } from "@/shared/api/base-api.ts";
import { Board } from "@/features/boards/types.ts";

export type ApiBoard = {
  id: number;
  name: string;
  description: string;
  taskCount: number;
};

export const fetchBoards = async () => {
  const response = await apiClient<ApiResponse<ApiBoard[]>>("/boards");
  return response.data;
};
