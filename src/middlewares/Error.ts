import { Response } from "express";

export interface ErrorBody {
  error: any;
  message?: any;
  success: boolean;
}

export const SendError = (
  res: Response,
  errorCode: number,
  data: ErrorBody
) => {
  return res.status(errorCode || 400).send(data);
};
