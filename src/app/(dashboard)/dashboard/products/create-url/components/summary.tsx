'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSearchParams, useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckoutFormValues } from '@/lib/validators/product'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useSelectedProduts from '@/hooks/use-selected-products'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'

const Summary = () => {
  const searchParams = useSearchParams()
  const items = useSelectedProduts(state => state.items)
  const removeAll = useSelectedProduts(state => state.removeAll)

  const [loading, setLoading] = useState(false)
  const [discount, setDiscount] = useState<number>(0)
  const router = useRouter()
  const cart = useSelectedProduts(s => s)

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price)
  }, 0)

  const subTotal = totalPrice - discount
  const isDisabled = totalPrice - discount < 0

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed.')
      removeAll()
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.')
    }
  }, [searchParams, removeAll])

  const onSubmit = async (value: CheckoutFormValues) => {
    try {
      setLoading(true)

      const data: CheckoutFormValues = {
        discount: value.discount,
        products: value.products,
      }
      await axios.post(`/api/admin/orders`, data)
      router.refresh()
      router.push(`/dashboard/orders`)
      toast.success('Create payment url ')
      setDiscount(0)
      cart.removeAll()
    } catch (error: any) {
      toast.error('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mb-2 h-full rounded-lg px-4 shadow-sm lg:col-span-5 ">
      <div className="h-full flex-col py-6  sm:px-6">
        <form className="w-full ">
          <div className="py-6 ">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label className="mb-1" htmlFor="discount">
                Discount
              </Label>
              <Input
                max={totalPrice}
                min={0}
                type="number"
                placeholder="9.99"
                id="discount"
                onChange={e => setDiscount(Number(e.target.value))}
              />
            </div>
          </div>
        </form>

        <div className="mt-4 flex flex-col gap-2">
          <div className="flex justify-between text-base font-medium">
            <p>Total</p>
            <p>${totalPrice}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <div
            className={cn(
              'flex justify-between text-base font-medium',
              isDisabled && 'text-red-500',
            )}
          >
            <p>Discount</p>
            <p>${Number(discount)}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
        </div>

        {isDisabled ? (
          <Alert className="mt-3" variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Discount total price dan butuk olamaz</AlertDescription>
          </Alert>
        ) : (
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex justify-between text-base font-medium">
              <p>Subtotal</p>
              <p>${subTotal}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
          </div>
        )}

        <Button
          isLoading={loading}
          disabled={loading || isDisabled}
          onClick={() => onSubmit({ discount, products: cart.items })}
          variant="primary"
          className="mt-6 w-full"
        >
          Create Payment Url
        </Button>

        <div className="mt-6 flex justify-center text-center text-sm">
          <Link
            href={'/dashboard/products'}
            className={cn(buttonVariants({ variant: 'default' }), 'w-full')}
          >
            Return Products
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </Card>
  )
}

export default Summary
