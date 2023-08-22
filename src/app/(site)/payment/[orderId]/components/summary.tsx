'use client'

import React, { useState } from 'react'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PaymentMethod } from '@/app/(site)/payment/[orderId]/components/payment-method'
import { Card } from '@/components/ui/card'

interface SummaryProps {
  order?: any
}

const Summary: React.FC<SummaryProps> = ({ order }) => {
  const [open, setOpen] = useState(false)

  const totalPrice = order?.orderItems?.reduce(
    (total: number, item: { product: { price: any } }) => {
      return total + Number(item.product.price)
    },
    0,
  )

  const subTotal = totalPrice - order?.discount

  return (
    <Card className="mb-2 h-full rounded-lg  shadow-xl lg:col-span-5 ">
      <div className="flex h-full flex-col justify-between gap-4 align-bottom shadow-xl  sm:px-6">
        <div className="mt-4 flex flex-col gap-4 px-4   ">
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex justify-between text-base font-medium">
              <p>Total</p>
              <p>${totalPrice}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className={cn('flex justify-between text-base font-medium')}>
              <p>Discount</p>
              <p>${Number(order?.discount)}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <div className="flex justify-between text-base font-medium">
              <p>Subtotal</p>
              <p>${subTotal}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
          </div>
        </div>

        <Button
          // disabled={isDisabled}
          onClick={() => setOpen(true)}
          variant="primary"
          className="mb-auto w-full"
        >
          Continue
        </Button>

        <AlertDialog open={open} onOpenChange={() => setOpen(true)}>
          <AlertDialogContent className="h-full min-h-screen overflow-y-scroll ">
            <AlertDialogHeader>
              <AlertDialogTitle>Payment Form</AlertDialogTitle>
              <AlertDialogDescription className="flex items-center justify-between">
                Add a new payment method to your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <PaymentMethod orderId={order.id as string} setOpen={setOpen} />
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Card>
  )
}

export default Summary
