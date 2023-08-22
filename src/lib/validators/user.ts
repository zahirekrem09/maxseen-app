import * as z from 'zod'
import isMobilePhone from 'validator/lib/isMobilePhone'

export const userNameSchema = z.object({
  name: z.string().min(3).max(32),
  bio: z.string().min(4).optional(),
  phone: z
    .string()
    .refine(isMobilePhone, {
      message: 'Must be a valid phone number',
    })
    .optional(),
})

export type UserFormValues = z.infer<typeof userNameSchema>
