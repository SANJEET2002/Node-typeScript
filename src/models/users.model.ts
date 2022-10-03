import { Schema, model } from "mongoose";

export interface User {
  name: string;
  username: string;
  password: string;
  role: string;
  email: string;
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: [true, "provide name "] },
    username: { type: String, required: [true, "provide username"] },
    password: { type: String, required: [true, "provide password"] },
    role: { type: String },
    email: { type: String, required: [true, "provide user email "] },
  },
  { timestamps: true }
);

export const user = model<User>("User", userSchema);
