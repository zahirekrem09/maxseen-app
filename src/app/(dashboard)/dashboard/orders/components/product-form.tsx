'use client'

import axios from 'axios'
import { Dispatch, SetStateAction, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Trash } from 'lucide-react'
import { Product } from '@prisma/client'
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
// import { Heading } from '@/components/ui/heading'
// import { AlertModal } from '@/components/modals/alert-modal'

import { Checkbox } from '@/components/ui/checkbox'
import { ProductFormValues, productFormSchema } from '@/lib/validators/product'
import { Textarea } from '@/components/ui/textarea'

interface ProductFormProps {
  initialData: (Product & {}) | null
  setShowNewProductialog?: Dispatch<SetStateAction<boolean>>
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  setShowNewProductialog,
}) => {
  const params = useParams()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? 'Edit product' : 'Create product'
  const description = initialData ? 'Edit a product.' : 'Add a new product'
  const toastMessage = initialData ? 'Product updated.' : 'Product created.'
  const action = initialData ? 'Save changes' : 'Create'

  const defaultValues = initialData
    ? {
        ...initialData,
        price: parseFloat(String(initialData?.price)),
      }
    : {
        title: '',
        image: '',
        price: 0,
        description: '',
        isArchived: false,
      }

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: defaultValues as any,
  })

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(`/api/admin/products/${params.productId}`, data)
      } else {
        await axios.post(`/api/admin/products`, data)
      }
      router.refresh()
      // router.push(`/${params.storeId}/products`)
      toast.success(toastMessage)
      setShowNewProductialog && setShowNewProductialog(false)
      form.reset()
    } catch (error: any) {
      toast.error('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${params.storeId}/products/${params.productId}`)
      router.refresh()
      router.push(`/${params.storeId}/products`)
      toast.success('Product deleted.')
    } catch (error: any) {
      toast.error('Something went wrong.')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      /> */}
      <div className="flex items-center justify-between">
        {/* <Heading title={title} description={description} /> */}
        {initialData && (
          <Button disabled={loading} variant="destructive" size="sm" onClick={() => setOpen(true)}>
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          {/* <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map(image => image.url)}
                    disabled={loading}
                    onChange={url => field.onChange([...field.value, { url }])}
                    onRemove={url =>
                      field.onChange([...field.value.filter(current => current.url !== url)])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Product title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Product description" className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" disabled={loading} placeholder="9.99" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isArchived"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    // @ts-ignore
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Archived</FormLabel>
                  <FormDescription>
                    This product will not appear anywhere in the store.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <Button disabled={loading} className="ml-auto w-full" type="submit">
            {action}
          </Button>
          {setShowNewProductialog && (
            <Button
              className="ml-auto w-full"
              variant={'destructive'}
              type="button"
              onClick={() => setShowNewProductialog(true)}
            >
              Cancel
            </Button>
          )}
        </form>
      </Form>
    </>
  )
}
