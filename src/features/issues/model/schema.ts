import { z } from "zod";
import { IssueFormValues } from "@/features/issues/types.ts";

export const IssueSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  priority: z.enum(["high", "medium", "low"]),
  status: z.enum(["backlog", "todo", "in_progress", "done"]),
  assigneeId: z.number().min(1),
  boardId: z.number().min(1),
}) satisfies z.ZodType<IssueFormValues>;