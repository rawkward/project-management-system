import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Modal } from "@/shared/ui/modal/Modal";
import { Box, Button, TextField, Typography } from "@mui/material";
import { AsyncSelect } from "@/shared/ui/selector/AsyncSelect.tsx";
import { Issue, IssueFormValues } from "../types";
import { IssueSchema } from "@/features/issues/model/schema.ts";
//import { createIssue, updateIssue } from "../api/issue-api";
import { fetchBoards } from "@/features/boards/api/board-api.ts";
import { fetchUsers } from "@/features/users/api/user-api.ts";
import { Link } from "react-router";

const PRIORITY_OPTIONS = [
  { value: "high", label: "Высокий" },
  { value: "medium", label: "Средний" },
  { value: "low", label: "Низкий" },
];

const STATUS_OPTIONS = [
  { value: "backlog", label: "Бэклог" },
  { value: "todo", label: "К выполнению" },
  { value: "in_progress", label: "В работе" },
  { value: "done", label: "Готово" },
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
  const { control, handleSubmit, formState, setValue } =
    useForm<IssueFormValues>({
      resolver: zodResolver(IssueSchema),
      defaultValues: {
        ...initialData,
        boardId: currentBoardId ?? initialData?.boardId,
      },
    });

  const { errors } = formState;

  // Загрузка проектов и пользователей
  const { data: boards = [], isLoading: isBoardsLoading } = useQuery({
    queryKey: ["boards"],
    queryFn: fetchBoards,
  });

  const { data: users = [], isLoading: isUsersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  // Подготовка опций
  const boardOptions = boards.map((p) => ({
    value: p.id,
    label: p.name,
  }));

  const userOptions = users.map((u) => ({
    value: u.id,
    label: u.fullName,
  }));

  // Автозаполнение boardId
  useEffect(() => {
    if (currentBoardId) setValue("boardId", currentBoardId);
  }, [currentBoardId]);

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation<void, Error, IssueFormValues>({
    mutationFn: (data) =>
      mode === "create" ? createIssue(data) : updateIssue(data), // Явная передача данных
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

        <form onSubmit={handleSubmit((data) => mutateAsync(data))}>
          {/* Название */}
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

          {/* Описание */}
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

          {/* Проект */}
          <AsyncSelect
            control={control}
            name="boardId"
            label="Проект"
            options={boardOptions}
            isLoading={isBoardsLoading}
            error={errors.boardId}
            disabled={!!currentBoardId}
          />

          {/* Приоритет */}
          <AsyncSelect
            control={control}
            name="priority"
            label="Приоритет"
            options={PRIORITY_OPTIONS}
            error={errors.priority}
          />

          {/* Статус */}
          <AsyncSelect
            control={control}
            name="status"
            label="Статус"
            options={STATUS_OPTIONS}
            error={errors.status}
          />

          {/* Исполнитель */}
          <AsyncSelect
            control={control}
            name="assigneeId"
            label="Исполнитель"
            options={userOptions}
            isLoading={isUsersLoading}
            error={errors.assigneeId}
          />

          {/* Кнопки действий */}
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
