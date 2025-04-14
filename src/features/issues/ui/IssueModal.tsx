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
import {
  DRAFT_KEY,
  initialEmptyForm,
  useDraftIssue,
} from "@/features/issues/hooks/useDraftIssue.ts";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { useIssueModal } from "@/features/issues/hooks/useIssueModal.ts";

const PRIORITY_OPTIONS = [
  { value: "High", label: "Высокий" },
  { value: "Medium", label: "Средний" },
  { value: "Low", label: "Низкий" },
];

const STATUS_OPTIONS = [
  { value: "Backlog", label: "To do" },
  { value: "InProgress", label: "In progress" },
  { value: "Done", label: "Done" },
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
  const form = useDraftIssue(issue || initialEmptyForm);
  const { control, handleSubmit, formState, watch, reset } = form;
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

  const { modalState } = useIssueModal();

  const params = useParams<{ id: string }>();

  const selectedBoardId =
    issue?.boardId ?? modalState?.currentBoardId ?? params.id;

  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      const localData = localStorage.getItem(DRAFT_KEY);
      if (localData && !issue) {
        reset(JSON.parse(localData));
      } else if (issue) {
        reset(issue);
      }
    }
  }, [open, issue, reset]);

  useEffect(() => {
    if (sourcePage === "boards" && selectedBoardId) {
      form.setValue("boardId", Number(selectedBoardId));
    }
  }, [selectedBoardId, form, sourcePage]);

  const onSubmit = async (data: IssueFormValues) => {
    try {
      const updatedIssue = await mutateAsync(data);

      if (!issue) {
        queryClient.setQueryData<Issue[]>(["issues"], (old) =>
          old ? [...old, updatedIssue] : [updatedIssue],
        );
      }

      if (!issue) localStorage.removeItem(DRAFT_KEY);
    } catch (error) {
      console.error("Ошибка сохранения:", error);
    }
  };

  const boardId = issue?.boardId;

  const { mutateAsync } = useMutation({
    mutationFn: async (data: IssueFormValues) => {
      if (issue?.id && boardId) {
        await updateIssue(issue.id, data);
        return fetchIssue(issue.id, boardId);
      } else {
        const newId = await createIssue(data);
        return fetchIssue(newId, data.boardId);
      }
    },
    onSuccess: (data: Issue) => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      queryClient.invalidateQueries({
        queryKey: ["board", data.boardId, "issues"],
      });
      onClose();
    },
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>
          {issue ? "Редактировать задачу" : "Создать задачу"}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
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
              disabled={sourcePage === "boards"}
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
                onClick={() => {
                  navigate(`/boards/${watch("boardId")}`);
                  onClose();
                }}
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
