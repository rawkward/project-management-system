import { apiClient } from "@/shared/api/base-api";
import type { ApiResponse} from "@/features/issues/types.ts";

export type ApiUser = {
  id: number;
  fullName: string;
  email: string;
  avatarUrl: string;
};

export const fetchUsers = async () => {
  const response = await apiClient<ApiResponse<ApiUser[]>>("/users");
  return response.data;
};