'use client'

import axios, { AxiosError } from 'axios'
import { Dispatch, SetStateAction, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Trash } from 'lucide-react'
import { User } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'

import { RegisterFormValues, registerFormSchema } from '@/lib/validators/register'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface UserFormProps {
  initialData: (User & {}) | null
  setShowNewUserDialog?: Dispatch<SetStateAction<boolean>>
}

export const UserForm: React.FC<UserFormProps> = ({ initialData, setShowNewUserDialog }) => {
  const params = useParams()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const title = initialData ? 'Edit user' : 'Create user'
  const description = initialData ? 'Edit a user.' : 'Add a new user'
  const toastMessage = initialData ? 'User updated.' : 'User created.'
  const action = initialData ? 'Save changes' : 'Create User'

  const defaultValues = initialData
    ? {
        ...initialData,
      }
    : {
        name: '',
        email: '',
        password: '',
        role: 'SALES',
      }

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'SALES',
    },
    // mode: 'onChange',
  })

  const onSubmit: SubmitHandler<RegisterFormValues> = async data => {
    setIsLoading(true)

    try {
      const res = await axios.post('/api/register', data)

      toast.success(toastMessage)
      setShowNewUserDialog && setShowNewUserDialog(false)
      router.refresh()
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data)
      }
      console.log({ error })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        {/* <Heading title={title} description={description} /> */}
        {initialData && (
          <Button
            disabled={isLoading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Joe Doe" {...field} />
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
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="user@email.com" {...field} />
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
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="shadcn" {...field} />
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
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>User Role </FormLabel>
                <FormDescription>Select the user role for the dashboard.</FormDescription>
                <FormMessage />
                <RadioGroup
                  onValueChange={() => field?.onChange}
                  defaultValue={field?.value}
                  className="grid max-w-md grid-cols-2 gap-8 pt-2"
                >
                  <FormItem>
                    <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="SALES" className="sr-only" />
                      </FormControl>
                      <div className="cursor-pointer items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                        <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                          <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                            <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                          </div>
                        </div>
                      </div>
                      <span className="block w-full p-2 text-center font-bold ">SALES</span>
                    </FormLabel>
                  </FormItem>
                  <FormItem>
                    <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="ADMIN" className="sr-only" />
                      </FormControl>
                      <div className="cursor-pointer items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                        <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                          <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                            <div className="h-4 w-4 rounded-full bg-slate-400" />
                            <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                          </div>
                        </div>
                      </div>
                      <span className="block w-full p-2 text-center font-bold">ADMIN</span>
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormItem>
            )}
          />
          <Button
            isLoading={isLoading}
            type="submit"
            className="w-full"
            disabled={isLoading}
            size="sm"
            variant="primary"
          >
            {action}
          </Button>
          {setShowNewUserDialog ? (
            <Button
              className="ml-auto w-full"
              variant={'destructive'}
              type="button"
              onClick={() => setShowNewUserDialog(false)}
            >
              Cancel
            </Button>
          ) : null}
        </form>
      </Form>
    </>
  )
}
