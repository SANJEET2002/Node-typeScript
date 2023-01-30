import * as yup from "yup";

export const newUserSchema = yup.object({
  username: yup.string().required("username required"),
  email: yup.string().required("email required").email("invalid email address"),
  name: yup.string().required("name required"),
  password: yup.string().required("password required"),
});

export const login = yup.object({
  email: yup
    .string()
    .required("email addres required")
    .email("invalid email address"),
  password: yup.string().required("password required"),
});
