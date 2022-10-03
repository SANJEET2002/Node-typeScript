import { Response, Request } from "express";
import { SendError } from "../middlewares/Error";
import { sendResponse } from "../middlewares/response";
import { user } from "../models/users.model";
import bcrypt from "bcrypt";
import { generateJwt } from "../middlewares/auth";

export const newUser = async (req: Request, res: Response) => {
  try {
    const { username, name, password, email } = req.body;
    if (!username || !name || !password) {
      return SendError(res, 400, { success: false, error: "invalid data" });
    } else {
      const checkUsername = await user.find({ username: username });

      if (checkUsername) {
        return SendError(res, 400, {
          success: false,
          error: "username not Available",
        });
      }

      const checkEmail = await user.findOne({ email: email });

      if (checkEmail) {
        return SendError(res, 400, {
          success: false,
          error: "email Id already in use",
        });
      }

      const hasedPassword = await bcrypt.hash(password, 12);

      const newUser = await user.create({
        name: name,
        username: username,
        password: hasedPassword,
        email: email,
      });
      sendResponse(res, 200, { success: true, data: newUser });
    }
  } catch (err) {
    SendError(res, 400, {
      error: err,
      success: false,
      message: "failed to Create user",
    });
  }
};

export const userlogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return SendError(res, 401, {
        success: false,
        error: "invalid credientails",
      });
    } else {
      const userDetails: any = await user.findOne({
        username: username,
      });
      if (userDetails) {
        const isPassswordCorrect = await bcrypt.compare(
          password,
          userDetails.password
        );

        if (!isPassswordCorrect) {
          return SendError(res, 401, {
            success: false,
            error: "Incorrect Password",
          });
        }

        const token = generateJwt(userDetails._id);

        sendResponse(res, 200, { success: true, token: token });
      } else {
        return SendError(res, 400, {
          success: false,
          error: "no user Found",
        });
      }
    }
  } catch (err) {
    console.log(err);
    SendError(res, 400, { error: err, success: false });
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
