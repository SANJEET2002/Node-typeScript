import { Response } from "express";
import { z } from "zod";

export const ErrorSchema = z.object({
  status_code: z.number().default(500).optional(),
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
});
export type ErrorBody = z.infer<typeof ErrorSchema>;

export const SendError = (res: Response, data: ErrorBody) => {
  return res.status(data.status_code || 400).send(data);
};
