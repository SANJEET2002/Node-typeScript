import express from "express";
import { body } from "express-validator";
import { newUser, userlogin, updateUser } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth";

const router = express.Router();

router.post("/users", newUser);
router.post("/userlogin", verifyToken, userlogin);
router.patch("/user", verifyToken, updateUser);
export default router;
