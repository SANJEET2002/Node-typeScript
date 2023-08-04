import mongoose, { Schema, model } from "mongoose";
import { User } from "./types";

type UserModal = User & mongoose.Document;

const userSchema = new Schema<UserModal>(
  {
    name: { type: String, required: [true, "provide name "] },
    email: { type: String, required: [true, "provide user email "] },
    password: { type: String, required: [true, "provide password"] },
    role: { type: String, enum: ["ADMIN", "USER"] },
    is_verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const user = model<User>("User", userSchema);
