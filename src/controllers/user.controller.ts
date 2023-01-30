import { Response, Request } from "express";
import { SendError } from "../middlewares/Error";
import { sendResponse } from "../middlewares/response";
import { user } from "../models/users.model";
import bcrypt from "bcrypt";
import { generateJwt } from "../middlewares/auth";
import jwt from "jsonwebtoken";

export const newUser = async (req: Request, res: Response) => {
  try {
    const { username, name, password, email } = req.body;
    const checkUsername = await user.findOne({ username: username });

    if (checkUsername) {
      return SendError(res, 400, {
        success: false,
        message: "username not Available",
        error: "username is taken ",
      });
    }

    const checkEmail = await user.findOne({ email: email });

    if (checkEmail) {
      return SendError(res, 400, {
        success: false,
        message: "email Id already in use",
        error: "email is taken",
      });
    }

    const hasedPassword = await bcrypt.hash(password.toString(), 12);

    await user.create({
      name: name,
      username: email,
      password: hasedPassword,
      email: email,
    });

    sendResponse(res, 200, {
      success: true,
      message: "user created Succesfully",
    });
  } catch (err) {
    console.log(err);
    SendError(res, 400, {
      error: err,
      success: false,
      message: "failed to Create user",
    });
  }
};

export const userlogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userDetails: any = await user.findOne({
      email,
    });
    if (userDetails) {
      const isPassswordCorrect = await bcrypt.compare(
        password,
        userDetails.password
      );

      if (!isPassswordCorrect) {
        return SendError(res, 401, {
          success: false,
          message: "Incorrect Password",
          error: "incorrect password ",
        });
      }

      // if (!userDetails.isVerified) {
      //   return SendError(res, 401, {
      //     success: false,
      //     error: "Email  not verified",
      //     message: {
      //       message: "Please Verify your email",
      //       email: userDetails.email,
      //     },
      //   });
      // }

      const token = generateJwt(userDetails._id);
      //@ts-ignore
      req.session.token = token;

      sendResponse(res, 200, {
        success: true,
        token: token,
        data: {
          name: userDetails.name,
          email: userDetails.email,
          _id: userDetails._id,
        },
      });
    } else {
      return SendError(res, 400, {
        success: false,
        message: "no user Found",
        error: "invalid Username ",
      });
    }
  } catch (err) {
    console.log(err);
    SendError(res, 400, {
      error: err,
      success: false,
      message: "inable  to Process Request ",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { username, email, name, _id } = req.body;

    await user.findByIdAndUpdate(_id, {
      username,
      email,
      name,
    });

    sendResponse(res, 200, { success: true, message: "details Updated" });
  } catch (err) {
    SendError(res, 400, {
      error: err,
      success: false,
      message: "failed to Create user",
    });
  }
};

export const authMe = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    console.log({ _id: req.id, user: req.user });

    //@ts-ignore
    const userDetails: any = await user.findOne({ _id: req.id });

    if (!userDetails) {
      return SendError(res, 403, {
        success: false,
        error: "no user Found ",
        message: "try again ",
      });
    }

    sendResponse(res, 200, {
      success: true,
      data: {
        name: userDetails.name,
        email: userDetails.email,
        _id: userDetails._id,
      },
    });
  } catch (err) {
    console.log(err);
    SendError(res, 400, {
      success: false,
      message: "inable to verify user ",
      error: err,
    });
  }
};
