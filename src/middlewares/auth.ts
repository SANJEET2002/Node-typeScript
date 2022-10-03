import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { SendError } from "./Error";
dotenv.config({ path: "./config/.env" });

export const generateJwt = (_id: string) => {
  let secertKey: any = process.env.JWT_SECRET_KEY;
  const token = jwt.sign({ _id: _id }, secertKey, { expiresIn: "30 days" });
  console.log(token);
  return token;
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers["authorization"];
    const token = header?.split(" ")[1];

    if (token) {
      const isValid = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
      if (isValid) {
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
