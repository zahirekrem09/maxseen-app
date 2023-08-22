import * as z from 'zod'
export const loginFormSchema = z.object({
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
  password: z
    .string()
    .min(2, {
      message: 'Password must be at least 2 characters.',
    })
    .max(30, {
      message: 'Password must not be longer than 30 characters.',
    }),
})

export const forgotPassFormSchema = z.object({
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
})

export const resetPassFormSchema = z.object({
  password: z
    .string()
    .min(2, {
      message: 'Password must be at least 2 characters.',
    })
    .max(30, {
      message: 'Password must not be longer than 30 characters.',
    }),
  token: z.string(),
})

export type LoginFormValues = z.infer<typeof loginFormSchema>
export type ForgotPassFormValues = z.infer<typeof forgotPassFormSchema>
export type ResetPassFormValues = z.infer<typeof resetPassFormSchema>
