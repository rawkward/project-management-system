import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/base-api.ts";
import { Board } from "@/features/boards/types.ts";

export const useBoard = (boardId: number) => {
  return useQuery({
    queryKey: ["board", boardId],
    queryFn: async ({ signal }) => {
      const response = await apiClient<{ data: Board[] }>("/boards", {
        signal,
      });
      const boards = response.data;

      const board = boards.find((b) => b.id === boardId);
      if (!board) throw new Error("Проект не найден");

      return board;
    },
    enabled: Boolean(boardId),
  });
};
