import * as z from 'zod'
export const registerFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  surname: z
    .string()
    .min(2, {
      message: 'Surname must be at least 2 characters.',
    })
    .max(30, {
      message: 'Surname must not be longer than 30 characters.',
    })
    .optional(),
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
  bio: z.string().max(160).min(4).optional(),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: 'Please enter a valid URL.' }),
      }),
    )
    .optional(),
  role: z.enum(['ADMIN', 'USER', 'SALES']).default('SALES'),
})

export type RegisterFormValues = z.infer<typeof registerFormSchema>
