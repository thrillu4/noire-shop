import { z } from "zod";

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  email: z.email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(6, { message: "Be at least 6 characters long" })
    .trim(),
  checkbox: z.literal(true, {
    error: () => ({
      message: "You must accept Terms & Conditions and Privacy Policy",
    }),
  }),
});
export type SignUpType = z.infer<typeof SignupFormSchema>;

export const SignInFormSchema = z.object({
  email: z.email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(6, { message: "Be at least 6 characters long" })
    .trim(),
});
export type SignInType = z.infer<typeof SignInFormSchema>;

export type SessionPayload = {
  userId: string | number;
  expiresAt: Date;
};
