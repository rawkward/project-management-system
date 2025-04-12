import { Controller } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Modal } from "@/shared/ui/modal/Modal";
import { Box, Button, TextField, Typography } from "@mui/material";
import { AsyncSelect } from "@/shared/ui/selector/AsyncSelect.tsx";
import { Issue, IssueFormValues } from "../types";
import { createIssue, fetchIssue, updateIssue } from "../api/issue-api";
import { fetchBoards } from "@/features/boards/api/board-api.ts";
import { fetchUsers } from "@/features/users/api/user-api.ts";

import { SelectSkeleton } from "@/shared/ui/skeletons/SelectSkeleton.tsx";
import { useDraftIssue } from "@/features/issues/hooks/useDraftIssue.ts";
import { Link } from "react-router";
import { useEffect } from "react";

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
  open: boolean;
  issue?: Issue | null;
  sourcePage?: "boards" | "issues";
  onClose: () => void;
};

export const IssueModal = ({
  open,
  issue,
  sourcePage,
  onClose,
}: IssueModalProps) => {
  const form = useDraftIssue(issue || undefined);
  const { control, handleSubmit, formState, watch } = form;
  const { errors } = formState;
  const queryClient = useQueryClient();

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

  useEffect(() => {
    if (issue) {
      form.reset({
        ...issue,
        boardId: issue.boardId,
        assigneeId: issue.assigneeId,
      });
    }
  }, [issue, form]);

  const { mutateAsync } = useMutation({
    mutationFn: async (data: IssueFormValues) => {
      if (issue?.id) {
        const updateData = { ...data, boardId: issue.boardId };
        await updateIssue(issue.id, updateData);
        return fetchIssue(issue.id);
      } else {
        const newId = await createIssue(data);
        return fetchIssue(newId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      onClose();
    },
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>
          {issue ? "Редактировать задачу" : "Создать задачу"}
        </Typography>

        <form
          onSubmit={handleSubmit(async (data: IssueFormValues) => {
            try {
              await mutateAsync(data);
              localStorage.removeItem("issue-draft");
              onClose();
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
              disabled={!!issue?.boardId}
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
            {sourcePage === "issues" && (
              <Button
                component={Link}
                to={`/boards/${watch("boardId")}`}
                disabled={!watch("boardId")}
              >
                Перейти на доску
              </Button>
            )}
            <Button type="submit" variant="contained" sx={{ ml: "auto" }}>
              {issue ? "Обновить" : "Создать"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
