import { z } from "zod";
import { IssueFormValues} from "@/features/issues/types.ts";

export const IssueSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["todo", "in_progress", "done"]),
  assigneeId: z.string().optional(),
  boardId: z.string().optional(),
}) satisfies z.ZodType<IssueFormValues>;