import * as z from 'zod'
export const productFormSchema = z.object({
  title: z.string().min(1),
  image: z.string().url().optional(),
  price: z.coerce.number().min(1),
  description: z.string().min(10),
  isArchived: z.boolean().default(false).optional(),
})

export type ProductFormValues = z.infer<typeof productFormSchema>
export const discountSchema = z.object({
  products: z.array(
    z.object({
      id: z.string(),
      price: z.number(),
    }),
  ),
  discount: z.number().optional().default(0),
})
// .refine(
//   data =>
//     data.discount >
//     data.products.reduce((total, item) => {
//       return total + Number(item.price)
//     }, 0),
//   {
//     message: 'Oops! Discont total price doesnt match',
//   },
// )

export type CheckoutFormValues = z.infer<typeof discountSchema>

// import { z } from "zod";
// import isCreditCard  from "validator/lib/isCreditCard";

// const userSchema = z.object({
//   name: z.string(),
//   creditCard: z.string().refine(isCreditCard, {
//     message: 'Must be a valid credit card number'
//   }),
// })
