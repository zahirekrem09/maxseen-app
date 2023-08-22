import { Icons } from '@/components/shared/Icons'
import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ErrorMessage } from '@hookform/error-message'
import { OrderFormValues, orderFormSchema } from '@/lib/validators/order'
import { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import { useConfettiContext } from '@/components/providers/Confetti'
import { Order } from '@prisma/client'

interface PaymentMethodProps {
  orderId?: string
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const PaymentMethod: React.FC<PaymentMethodProps> = ({ orderId, setOpen }) => {
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const confettiCtx = useConfettiContext()
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    // mode: 'onChange',
    mode: 'all',
    defaultValues: {
      orderId,
    },
  })

  const onSubmit = async (data: OrderFormValues) => {
    try {
      setLoading(true)
      const res = await axios.post<Order>(`/api/admin/payment`, data)
      if (res.status === 200) {
        router.replace(`/success?success=${res.data.transId}`)
        router.refresh()
      }
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return toast.error(error?.response?.data.response.descr ?? 'Something went wrong.')
      }
      toast.error('Something went wrong.')

      return router.replace(`/cancel?canceled=1`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed.')
      confettiCtx.showConfetti()
      form.reset()
      setOpen(false)
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.')
    }
  }, [searchParams, setOpen, form, confettiCtx])

  return (
    <div className="my-3 h-full overflow-scroll px-2 py-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" flex w-full flex-col gap-2  ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Jhon Doe" {...field} />
                </FormControl>
                {/* <FormDescription>
                    This is your public display name. It can be your real name or a pseudonym. You
                    can only change this once every 30 days.
                  </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="demo@email.com" {...field} />
                </FormControl>
                {/* <FormDescription>
                      This is your public display name. It can be your real name or a pseudonym. You
                      can only change this once every 30 days.
                    </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone </FormLabel>
                <FormControl>
                  <Input placeholder="232323232323" {...field} />
                </FormControl>
                {/* <FormDescription>
                      This is your public display name. It can be your real name or a pseudonym. You
                      can only change this once every 30 days.
                    </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>

                  <FormControl>
                    <Input placeholder="New York" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>

                  <FormControl>
                    <Input placeholder="New York" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code </FormLabel>
                  <FormControl>
                    <Input placeholder="232333" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address </FormLabel>
                <FormControl>
                  <Input placeholder="Your address or zip code " {...field} />
                </FormControl>
                {/* <FormDescription>
                      This is your public display name. It can be your real name or a pseudonym. You
                      can only change this once every 30 days.
                    </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="creditCard"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card number </FormLabel>
                <FormControl>
                  <Input type="number" placeholder="232323232323" {...field} />
                </FormControl>
                {/* <FormDescription>
                      This is your public display name. It can be your real name or a pseudonym. You
                      can only change this once every 30 days.
                    </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="expire.month"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expires</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">January</SelectItem>
                      <SelectItem value="2">February</SelectItem>
                      <SelectItem value="3">March</SelectItem>
                      <SelectItem value="4">April</SelectItem>
                      <SelectItem value="5">May</SelectItem>
                      <SelectItem value="6">June</SelectItem>
                      <SelectItem value="7">July</SelectItem>
                      <SelectItem value="8">August</SelectItem>
                      <SelectItem value="9">September</SelectItem>
                      <SelectItem value="10">October</SelectItem>
                      <SelectItem value="11">November</SelectItem>
                      <SelectItem value="12">December</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expire.year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expire</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger id="year">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => (
                        <SelectItem key={i} value={`${new Date().getFullYear() + i}`}>
                          {new Date().getFullYear() + i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cvc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cvc </FormLabel>
                  <FormControl>
                    <Input placeholder="232" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <ErrorMessage
            errors={form.formState.errors}
            name="expire"
            render={({ message }) => (
              <p className={'text-sm font-medium text-destructive'}>{message}</p>
            )}
          />

          <Button
            isLoading={loading}
            disabled={!form.formState.isValid}
            type="submit"
            variant="primary"
            className="mt-3 w-full"
          >
            Pay Now
          </Button>
          <Button
            onClick={() => setOpen(false)}
            type="button"
            variant="destructive"
            className="mt-3 w-full"
          >
            Cancel
          </Button>
        </form>
      </Form>
    </div>
  )
}
