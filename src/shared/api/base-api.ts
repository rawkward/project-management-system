import { useQuery, QueryClient } from "@tanstack/react-query";

export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const apiClient = async <T>(url: string, config?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${url}`, config);
  return await response.json();
};