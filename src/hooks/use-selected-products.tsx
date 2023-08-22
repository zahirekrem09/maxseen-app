import { create } from 'zustand'
import { toast } from 'react-hot-toast'
import { persist, createJSONStorage } from 'zustand/middleware'

import { Product } from '@/types'

interface ProductStore {
  items: Product[]
  addItem: (data: Product) => void
  removeItem: (id: string) => void
  removeAll: () => void
}

const useSelectedProduts = create(
  persist<ProductStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items
        const existingItem = currentItems.find(item => item.id === data.id)

        if (existingItem) {
          set({ items: [...get().items.filter(item => item.id !== data.id)] })
          return toast.success('Product remove')
        }

        set({ items: [...get().items, data] })
        toast.success('Product Selected')
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter(item => item.id !== id)] })
        toast.success('Product remove')
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default useSelectedProduts
