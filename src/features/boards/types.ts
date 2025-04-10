import { ApiResponse } from "@/features/issues/types.ts";

export type ApiBoard = {
  id: number;
  name: string;
  description: string;
  taskCount: number;
};

export type ApiBoardsResponse = ApiResponse<ApiBoard[]>;

export type BoardOption = {
  id: number;
  name: string;
};
