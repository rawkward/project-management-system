import { z } from "zod";

export const IssueSchema = z.object({
  title: z.string().min(1, "Укажите название"),
  description: z.string().optional().nullable(),
  priority: z.enum(["high", "medium", "low"], {
    required_error: "Выберите приоритет",
  }),
  status: z.enum(["backlog", "todo", "in_progress", "done"], {
    required_error: "Выберите статус",
  }),
  assigneeId: z.number().min(1, "Выберите исполнителя").optional().nullable(),
  boardId: z.number().min(1, "Выберите проект"),
});
