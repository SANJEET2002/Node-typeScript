import express from "express";
import { body } from "express-validator";
import { newUser, userlogin } from "../controllers/user.controller";

const router = express.Router();

router.post("/users", newUser);
router.post("/userlogin", userlogin);

export default router;
