import { Response, Request } from "express";
import { SendError } from "../middlewares/Error";
import { sendResponse } from "../middlewares/response";
import { user } from "../models/users.model";
import bcrypt from "bcrypt";
import { generateJwt } from "../middlewares/auth";

export const newUser = async (req: Request, res: Response) => {
  try {
    const { name, password, email } = req.body;

    const checkEmail = await user.findOne({ email: email });

    if (checkEmail) {
      return SendError(res, {
        status_code: 401,
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

    sendResponse(res, {
      status_code: 200,
      success: true,
      message: "user created Succesfully",
    });
  } catch (err) {
    console.log(err);
    SendError(res, {
      status_code: 500,
      error: err,
      success: false,
      message: "failed to Create user",
    });
  }
};

export const userlogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userDetails = await user.findOne({
      email,
    });
    if (userDetails) {
      const isPassswordCorrect = await bcrypt.compare(
        password,
        userDetails.password
      );

      if (!isPassswordCorrect) {
        return SendError(res, {
          status_code: 401,
          success: false,
          message: "Incorrect Password",
          error: "incorrect password ",
        });
      }

      if (!userDetails.is_verified) {
        return SendError(res, {
          status_code: 401,
          success: false,
          error: "Email  not verified",
          message: "user Email not verfied",
        });
      }

      //@ts-ignore
      const token = generateJwt(userDetails._id as string);

      sendResponse(res, {
        success: true,
        token: token,
        data: {
          name: userDetails.name,
          email: userDetails.email,
          _id: userDetails._id,
        },
      });
    } else {
      return SendError(res, {
        status_code: 400,
        success: false,
        message: "no user Found",
        error: "invalid Username ",
      });
    }
  } catch (err) {
    console.log(err);
    SendError(res, {
      status_code: 400,
      error: err,
      success: false,
      message: "inable  to Process Request ",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { email, name, _id } = req.body;

    await user.findByIdAndUpdate(_id, {
      email,
      name,
    });

    sendResponse(res, { success: true, message: "details Updated" });
  } catch (err) {
    SendError(res, {
      error: err,
      success: false,
      message: "failed to Update user",
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
      return SendError(res, {
        status_code: 403,
        success: false,
        error: "no user Found ",
        message: "try again ",
      });
    }

    sendResponse(res, {
      status_code: 200,
      success: true,
      data: {
        name: userDetails.name,
        email: userDetails.email,
        _id: userDetails._id,
      },
    });
  } catch (err) {
    console.log(err);
    SendError(res, {
      status_code: 500,
      success: false,
      message: "Unable to verify user ",
      error: err,
    });
  }
};
