"use server";
import prisma from "@/lib/prisma";
import { SignInFormSchema, SignupFormSchema } from "@/lib/types";
import bcrypt from "bcrypt";

export type FormState = {
  success?: boolean;
  errors?: Record<string, string>;
  fields?: Record<string, string>;
};

export async function signup(prevState: FormState, formData: FormData) {
  const parsed = SignupFormSchema.safeParse({
    name: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    checkbox: formData.get("checkbox") === "on",
  });

  const fields = Object.fromEntries(formData) as Record<string, string>;

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    parsed.error.issues.forEach((issue) => {
      const field = issue.path[0] as string;
      errors[field] = issue.message;
    });
    return { success: false, errors, fields };
  }

  const { name, email, password } = parsed.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return {
      success: false,
      errors: { server: "User already exist" },
      fields: {},
    };
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashPassword,
      name,
    },
  });

  return { success: true, errors: {}, fields: {} };
}

export async function signin(prevState: FormState, formData: FormData) {
  const parsed = SignInFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  const fields = Object.fromEntries(formData) as Record<string, string>;

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    parsed.error.issues.forEach((issue) => {
      const field = issue.path[0] as string;
      errors[field] = issue.message;
    });
    return { success: false, errors, fields };
  }
  return { success: true, errors: {}, fields: {} };
}
