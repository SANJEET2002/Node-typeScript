import { Response } from "express";

export interface ResponseBody {
  success: boolean;
  data?: any;
  count?: number;
  message?: string;
  token?: string;
}

export const sendResponse = (
  res: Response,
  responseCode: number,
  responseBody: ResponseBody
) => {
  return res.status(responseCode || 200).send(responseBody);
};
