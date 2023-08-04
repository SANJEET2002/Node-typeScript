import { Response } from "express";
import { z } from "zod";

const ResponseBodySchema = z.object({
  status_code: z.number().default(200).optional(),
  success: z.boolean(),
  data: z.any().optional(),
  count: z.number().optional(),
  message: z.string().optional(),
  token: z.string().optional(),
});

export type ResponseBody = z.infer<typeof ResponseBodySchema>;

export const sendResponse = (res: Response, responseBody: ResponseBody) => {
  return res.status(responseBody.status_code || 200).send(responseBody);
};
