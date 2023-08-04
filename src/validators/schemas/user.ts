import { z } from "zod";

export const newUserSchema = z.object({
  email: z.string().email("invalid email address"),
  name: z.string(),
  password: z.string().min(6, "password should be grater than 6 characters"),
});

export const login = z.object({
  email: z.string().email("invalid email address"),
  password: z.string(),
});
