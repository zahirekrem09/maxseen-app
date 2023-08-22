'use client'

import { cn } from '@/lib/utils'
import { signIn, useSession } from 'next-auth/react'
import * as React from 'react'
import { FC } from 'react'
import { toast } from 'react-hot-toast'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { redirect, useRouter } from 'next/navigation'

import { ForgotPassFormValues, forgotPassFormSchema } from '@/lib/validators/login'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Icons } from '@/components/shared/Icons'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios, { AxiosError } from 'axios'

interface ForgotPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const router = useRouter()

  const form = useForm<ForgotPassFormValues>({
    resolver: zodResolver(forgotPassFormSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<ForgotPassFormValues> = data => {
    setIsLoading(true)

    axios
      .post('/api/forgot-password', data)
      .then(() => {
        toast.success('Email sent please check your mailbox!')
        router.push('/login')
      })
      .catch(error => {
        toast.error('Email not found')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className={cn('flex justify-center', className)} {...props}>
      <Card className="w-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Reset to your password!</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="maxseen@email.com" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              isLoading={isLoading}
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              className="w-full"
              disabled={isLoading}
              size="sm"
            >
              Submit
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ForgotPasswordForm
