import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IssueSchema } from "../model/schema";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Issue, IssueFormValues } from "../types";
import { Modal } from "@/shared/ui/modal/Modal";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router";
import { createIssue, updateIssue } from "../api/issueApi";

type IssueModalProps = {
  mode: "create" | "edit";
  initialData?: Partial<Issue>;
  currentBoardId?: string;
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
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IssueFormValues>({
    resolver: zodResolver(IssueSchema),
    defaultValues: {
      ...initialData,
      boardId: currentBoardId || initialData?.boardId,
    },
  });
//TODO: fix type errors
  useEffect(() => {
    if (currentBoardId) {
      setValue("boardId", currentBoardId);
    }
  }, [currentBoardId]);

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation<void, Error, IssueFormValues>({
    mutationFn: mode === "create" ? createIssue : updateIssue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] }); // Исправьте ключ на "issues"
      onClose();
    },
  });

  const handleFormSubmit = (data: IssueFormValues) => mutateAsync(data);

  return (
    <Modal open onClose={onClose}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>
          {mode === "create" ? "Создание задачи" : "Редактирование задачи"}
        </Typography>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Controller
            name="boardId"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Проект"
                disabled={!!currentBoardId}
                fullWidth
                margin="normal"
              />
            )}
          />

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
