import { QueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/base-api.ts";

const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        queryFn: async ({ queryKey: [url], signal }) => {
          if (typeof url !== "string") {
            throw new Error("Invalid queryKey");
          }
          return apiClient(url, { signal });
        },
      },
      mutations: {
        mutationFn: async (variables: unknown) => {
          if (
            typeof variables === "object" &&
            variables !== null &&
            "url" in variables
          ) {
            const { url, ...config } = variables as {
              url: string;
              [key: string]: unknown;
            };

            const requestConfig: Omit<RequestInit, "signal"> & {
              signal?: AbortSignal;
            } = {
              method: "POST",
              ...config,
              signal: config.signal as AbortSignal | undefined,
            };

            return apiClient(url, requestConfig);
          }
          throw new Error("Invalid mutation variables format");
        },
      },
    },
  });
};

export const queryClient = createQueryClient();
