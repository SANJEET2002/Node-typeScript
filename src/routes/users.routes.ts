import express from "express";
import {
  newUser,
  userlogin,
  updateUser,
  authMe,
} from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth";
import { ValidateBodySchema } from "../validators/validator";
import { newUserSchema, login } from "../validators/schemas/user";
const router = express.Router();

router.post("/user", ValidateBodySchema(newUserSchema), newUser);
router.patch("/user", verifyToken, updateUser);
router.post("/login", ValidateBodySchema(login), userlogin);
router.get("/autMe", verifyToken, authMe);
export default router;
