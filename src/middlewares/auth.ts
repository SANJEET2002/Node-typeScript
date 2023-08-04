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
    let token = req.headers.authorization?.split(" ")[1] as string;

    console.log({ token });

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
        SendError(res, {
          status_code: 401,
          error: "JWT expired",
          success: false,
          message: "User Authorization failed",
        });
      }
    } else {
      SendError(res, {
        status_code: 401,
        error: "No JWT token found",
        success: false,
        message: "User Authorization failed",
      });
    }
  } catch (err) {
    SendError(res, {
      error: err,
      success: false,
      message: "not Authorised",
    });
  }
};
