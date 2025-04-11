import { z } from "zod";
import { IssueFormValues } from "@/features/issues/types.ts";

export const IssueSchema = z.object({
  title: z.string().min(1, "Укажите название"),
  description: z.string().min(1, "Укажите описание"),
  priority: z.enum(["Low", "Medium", "High"], {
    required_error: "Выберите приоритет",
  }),
  status: z.enum(["Backlog", "Todo", "InProgress", "Done"], {
    required_error: "Выберите статус",
  }),
  boardId: z.number().min(1, "Выберите проект"),
  assigneeId: z.number().min(1, "Выберите исполнителя"),
}) satisfies z.ZodType<IssueFormValues>;
