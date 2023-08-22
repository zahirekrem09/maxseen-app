'use client'

import { cn } from '@/lib/utils'
import { signIn, useSession } from 'next-auth/react'
import * as React from 'react'
import { FC } from 'react'
import { toast } from 'react-hot-toast'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { redirect, useRouter } from 'next/navigation'

import { ResetPassFormValues, resetPassFormSchema } from '@/lib/validators/login'
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

interface ResetPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {
  token: string
}

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ className, token, ...props }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const router = useRouter()

  const form = useForm<ResetPassFormValues>({
    resolver: zodResolver(resetPassFormSchema),
    defaultValues: {
      password: '',
      token: token,
    },
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<ResetPassFormValues> = data => {
    setIsLoading(true)

    axios
      .post('/api/reset-password', data)
      .then(() => {
        toast.success('Your password has been successfully updated')
        router.push('/login')
      })
      .catch(error => {
        toast.error('Token not found or expaire ')
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Your new password" {...field} />
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

export default ResetPasswordForm
