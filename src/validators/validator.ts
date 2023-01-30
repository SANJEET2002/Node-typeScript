import * as yup from "yup";
import { NextFunction, Request, Response } from "express";

export const ValidateBodySchema =
  (schema: yup.AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (err: any) {
      res.status(403).send({ err: err.errors , path : err.inner });
      console.log({ err });
    }
  };
