import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { SendError } from "./Error";
import { user } from "../models/users.model";
dotenv.config({ path: "./config/.env" });

export const generateJwt = (_id: string) => {
  let secertKey: any = process.env.JWT_SECRET_KEY;
  const token = jwt.sign({ _id: _id }, secertKey, { expiresIn: "30 days" });
  console.log(token);
  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // @ts-ignore
    const token = req.session.token;

    if (token) {
      const isValid: any = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY as string
      );
      if (isValid) {
        // @ts-ignore
        req.id = isValid._id;
        // @ts-ignore
        req.user = await user.findOne({ _id: isValid.id });
        next();
      } else {
        SendError(res, 401, { error: "not Authorized ", success: false });
      }
    } else {
      SendError(res, 401, { error: "not Authorized ", success: false });
    }
  } catch (err) {
    SendError(res, 401, {
      error: err,
      success: false,
      message: "not Authorised",
    });
  }
};
