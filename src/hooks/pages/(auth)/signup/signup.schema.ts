import { z } from "zod";

export const signupSchema = z
  .object({
    displayName: z
      .string()
      .min(1, { message: "Display name is required" })
      .min(3, { message: "Display name must be at least 3 characters" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Please enter a valid email address" }),
    phone: z
      .string()
      .min(1, { message: "Phone number is required" })
      .regex(/^[0-9]{10,13}$/, {
        message: "Please enter a valid phone number",
      }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;
