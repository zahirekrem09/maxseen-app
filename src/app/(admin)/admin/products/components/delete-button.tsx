'use client'
import { AlertModal } from '@/components/ui/alert-modal'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'
import { Trash } from 'lucide-react'
type Props = {
  productId: string
}

export const ProductDeleteButton = ({ productId }: Props) => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const onConfirm = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/admin/products/${productId}`)
      toast.success('Product deleted.')
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
        <Trash className="mr-2 h-4 w-4" /> Delete
      </Button>
    </>
  )
}
