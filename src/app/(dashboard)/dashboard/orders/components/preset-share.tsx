'use client'
import { CopyIcon } from '@radix-ui/react-icons'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button, buttonVariants } from '@/components/ui/button'
import { OrderColumn } from './columns'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { ExternalLink, SendIcon, ShareIcon } from 'lucide-react'
import { Share } from 'lucide-react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form'
import { ForgotPassFormValues, forgotPassFormSchema } from '@/lib/validators/login'
import axios from 'axios'
import { SendLinkFormValues, sendLinkFormSchema } from '@/lib/validators/order'
interface PresetShareProps {
  data: OrderColumn
}

export const PresetShare: React.FC<PresetShareProps> = ({ data }) => {
  const [showSendInput, setShowSendInput] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/payment/${data.id}`

  const form = useForm<SendLinkFormValues>({
    resolver: zodResolver(sendLinkFormSchema),
    defaultValues: {
      email: '',
      orderId: data.id,
    },
    mode: 'onChange',
  })
  const onCopy = () => {
    navigator.clipboard.writeText(url)
    toast.success('Payment url  copied to clipboard.')
  }
  const onSend = () => {
    setShowSendInput(p => !p)
  }
  const onSubmit: SubmitHandler<SendLinkFormValues> = data => {
    setIsLoading(true)

    axios
      .post('/api/admin/payment/send-link', data)
      .then(() => {
        toast.success('Email sent please check  mailbox!')
        setShowSendInput(p => !p)
        form.reset()
      })
      .catch(error => {
        toast.error('Someting is wrong')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline">
          <span className="sr-only">Share</span>
          <Share className="mr-1 h-4 w-4" /> Share
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <div className="flex flex-col space-y-2 text-center sm:text-left">
          <h3 className="text-lg font-semibold">Share Payment Url</h3>
          <p className="text-sm text-muted-foreground">Anyone with this link can view it.</p>
        </div>
        <div className="flex w-full flex-col items-start gap-2  pt-4">
          {showSendInput ? (
            <div className="grid w-full flex-1 gap-2">
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
                <div className="float-right flex gap-2 ">
                  <Button
                    isLoading={isLoading}
                    type="button"
                    onClick={form.handleSubmit(onSubmit)}
                    className="w-full"
                    disabled={isLoading}
                    size="sm"
                    variant="primary"
                  >
                    Send
                  </Button>
                  <Button onClick={onSend} type="button" size="sm" variant="destructive">
                    Cancel
                  </Button>
                </div>
              </Form>
            </div>
          ) : (
            <>
              <div className="grid w-full flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input id="link" defaultValue={url} readOnly className="h-9" />
              </div>
              <div className="float-right ml-auto flex items-center gap-2">
                <Button onClick={() => onCopy()} type="submit" size="sm" className="px-3">
                  <span className="sr-only">Copy</span>
                  <CopyIcon className="h-4 w-4" />
                </Button>
                <Button onClick={onSend} type="submit" size="sm" variant="outline">
                  <span className="sr-only">Send</span>
                  <SendIcon className="h-4 w-4 text-violet-600" />
                </Button>
                <Link
                  target="_blank"
                  href={url}
                  className={buttonVariants({ variant: 'primary', size: 'sm' })}
                >
                  <span className="sr-only">show</span>
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
