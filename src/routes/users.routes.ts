import express from "express";
import {
  newUser,
  userlogin,
  updateUser,
  authMe,
} from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth";

const router = express.Router();

router.post("/users", newUser);
router.post("/userlogin", userlogin);
router.patch("/user", verifyToken, updateUser);
router.get("/autMe", verifyToken, authMe);
export default router;
