import { z } from "zod";
import { NextFunction, Request, Response } from "express";
import { SendError } from "../middlewares/Error";

export const ValidateBodySchema =
  (schema: z.AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = schema.parse(req.body);
      req.body = body;
      next();
    } catch (err: any) {
      console.log(err);
      SendError(res, {
        status_code: 403,
        success: false,
        message: "Validation failed",
        error: err.message,
      });
      console.log({ err });
    }
  };
