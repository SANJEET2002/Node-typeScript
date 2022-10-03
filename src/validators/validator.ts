import { body } from "express-validator";

export const userSignUp = () => {
  body("username").isEmail();
};
