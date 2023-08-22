import * as z from 'zod'
import isCreditCard from 'validator/lib/isCreditCard'
import isMobilePhone from 'validator/lib/isMobilePhone'
import isPostalCode from 'validator/lib/isPostalCode'

export const orderFormSchema = z.object({
  name: z.string().min(3),
  orderId: z.string().optional(),
  email: z
    .string({
      // required_error: 'Must be a valid email.',isPostalCode(str, locale)
    })
    .email(),
  isArchived: z.boolean().default(false).optional(),
  phone: z.string().refine(isMobilePhone, {
    message: 'Must be a valid phone number',
  }),
  creditCard: z.string().refine(isCreditCard, {
    message: 'Must be a valid credit card number',
  }),
  address: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  zipCode: z.string().refine(data => isPostalCode(data, 'US'), {
    message: 'Must be a valid zipcode',
  }),
  expire: z
    .object({
      month: z.string().min(1).max(2),
      year: z.string(),
    })
    .refine(
      data => {
        const today = new Date()
        const expire_month = Number(data.month)
        const expire_year = Number(data.year)
        const monthToday = today.getMonth() + 1
        const yearToday = today.getFullYear()

        if (Number(expire_year) < Number(yearToday)) {
          return false
        } else if (Number(expire_month) < monthToday && Number(expire_year) <= Number(yearToday)) {
          return false
        }
        return true
      },
      {
        message: 'Oops! Must be a valid  expire date',
      },
    ),
  cvc: z.string().max(3, 'Must be a valid cvc number').min(3, 'Must be a valid cvc number'),
})

export const sendLinkFormSchema = z.object({
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
  orderId: z.string().optional(),
})

export type OrderFormValues = z.infer<typeof orderFormSchema>
export type SendLinkFormValues = z.infer<typeof sendLinkFormSchema>
