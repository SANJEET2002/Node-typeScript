import { z } from "zod";

const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6, "password should be greater than 6 character"),
  is_verified: z.boolean().default(false),
  role: z.enum(["ADMIN", "USER"]).default("USER"),
});

type User = z.infer<typeof UserSchema>;
