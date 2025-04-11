import { Controller } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Modal } from "@/shared/ui/modal/Modal";
import { Box, Button, TextField, Typography } from "@mui/material";
import { AsyncSelect } from "@/shared/ui/selector/AsyncSelect.tsx";
import { Issue, IssueFormValues } from "../types";
import { createIssue, fetchIssue, updateIssue } from "../api/issue-api";
import { fetchBoards } from "@/features/boards/api/board-api.ts";
import { fetchUsers } from "@/features/users/api/user-api.ts";
import { Link } from "react-router";
import { SelectSkeleton } from "@/shared/ui/skeletons/SelectSkeleton.tsx";
import { useDraftIssue } from "@/features/issues/hooks/useDraftIssue.ts";

const PRIORITY_OPTIONS = [
  { value: "High", label: "Высокий" },
  { value: "Medium", label: "Средний" },
  { value: "Low", label: "Низкий" },
];

const STATUS_OPTIONS = [
  { value: "Backlog", label: "Бэклог" },
  { value: "Todo", label: "К выполнению" },
  { value: "InProgress", label: "В работе" },
  { value: "Done", label: "Готово" },
];

type IssueModalProps = {
  mode: "create" | "edit";
  initialData?: Partial<Issue>;
  currentBoardId?: number;
  sourcePage?: "boards" | "issues";
  onClose: () => void;
};

export const IssueModal = ({
  mode,
  initialData,
  currentBoardId,
  sourcePage,
  onClose,
}: IssueModalProps) => {
  const form = useDraftIssue(mode);

  const { control, handleSubmit, formState } = form;
  const { errors } = formState;

  const { data: boards = [], isLoading: isBoardsLoading } = useQuery({
    queryKey: ["boards"],
    queryFn: fetchBoards,
  });

  const { data: users = [], isLoading: isUsersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const boardOptions = boards.map((p) => ({
    value: p.id,
    label: p.name,
  }));

  const userOptions = users.map((u) => ({
    value: u.id,
    label: u.fullName,
  }));

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async (data: IssueFormValues) => {
      if (mode === "create") {
        const newId = await createIssue(data);
        return fetchIssue(newId);
      } else {
        if (!initialData?.id) throw new Error("ID задачи не указан");
        await updateIssue(initialData.id, data);
        return fetchIssue(initialData.id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      onClose();
    },
  });

  return (
    <Modal open onClose={onClose}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>
          {mode === "create" ? "Создать задачу" : "Редактировать задачу"}
        </Typography>

        <form
          onSubmit={handleSubmit(async (data: IssueFormValues) => {
            try {
              await mutateAsync(data);
              localStorage.removeItem("issue-draft");
            } catch (error) {
              console.error("Ошибка сохранения:", error);
            }
          })}
        >
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Название"
                error={!!errors.title}
                helperText={errors.title?.message}
                fullWidth
                margin="normal"
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Описание"
                error={!!errors.description}
                helperText={errors.description?.message}
                multiline
                rows={3}
                fullWidth
                margin="normal"
              />
            )}
          />

          {isBoardsLoading ? (
            <SelectSkeleton />
          ) : (
            <AsyncSelect
              control={control}
              name="boardId"
              label="Проект"
              options={boardOptions}
              isLoading={isBoardsLoading}
              error={errors.boardId}
              disabled={!!currentBoardId}
            />
          )}

          <AsyncSelect
            control={control}
            name="priority"
            label="Приоритет"
            options={PRIORITY_OPTIONS}
            error={errors.priority}
          />

          <AsyncSelect
            control={control}
            name="status"
            label="Статус"
            options={STATUS_OPTIONS}
            error={errors.status}
          />

          {isUsersLoading ? (
            <SelectSkeleton />
          ) : (
            <AsyncSelect
              control={control}
              name="assigneeId"
              label="Исполнитель"
              options={userOptions}
              isLoading={isUsersLoading}
              error={errors.assigneeId}
            />
          )}

          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            {sourcePage !== "boards" && (
              <Button
                variant="outlined"
                component={Link}
                to={`/boards/${initialData?.boardId}`}
                disabled={!initialData?.boardId}
              >
                Перейти на доску
              </Button>
            )}
            <Button type="submit" variant="contained" sx={{ ml: "auto" }}>
              {mode === "create" ? "Создать" : "Обновить"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
