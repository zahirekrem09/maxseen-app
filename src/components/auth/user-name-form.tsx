'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { cn } from '@/lib/utils'
import { UserFormValues, userNameSchema } from '@/lib/validators/user'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { toast } from 'react-hot-toast'
import { Icons } from '@/components/shared/Icons'
import { useSession } from 'next-auth/react'
import { Textarea } from '@/components/ui/textarea'

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, 'id' | 'name' | 'bio' | 'phone'>
}

export function UserNameForm({ user, className, ...props }: UserNameFormProps) {
  const router = useRouter()
  const { data: session, update } = useSession()
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      name: user?.name || '',
      phone: user.phone || '',
      bio: user.bio || 'I own a computer.',
    },
  })
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function onSubmit(data: UserFormValues) {
    setIsSaving(true)

    const response = await fetch(`/api/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast.error('Your profile was not updated. Please try again.')
    }
    await update({
      ...session,
      user: {
        ...session?.user,

        name: data.name,
      },
    })

    toast.success('Your profile has been updated.')

    router.refresh()
  }

  return (
    <Card className=" max-w-full md:max-w-[500px]">
      <Form {...form}>
        <form className={cn(className)} onSubmit={form.handleSubmit(onSubmit)} {...props}>
          <CardHeader>
            <CardTitle>Your Profile </CardTitle>
            <CardDescription>
              Please enter your profile or a display name you are comfortable with.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
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
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>
                      You can <span>@mention</span> other users and organizations to link to them.
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
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="primary" type="submit" disabled={isSaving}>
              {isSaving && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              <span>Save changes</span>
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
