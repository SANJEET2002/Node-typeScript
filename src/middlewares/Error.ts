import { Response } from "express";

export interface ErrorBody {
  error: any;
  message?: string;
  success: boolean;
}

export const SendError = (
  res: Response,
  errorCode: number,
  data: ErrorBody
) => {
  return res.status(errorCode || 400).send(data);
};
