export interface CartItem {
  id: string
  title: string
  price: number
  size: string
  image: string
  quantity: number
}

const STORAGE_KEY = 'salty-cart'

export const useCart = () => {
  const cart = useState<CartItem[]>('cart', () => [])
  const isOpen = useState<boolean>('cartOpen', () => false)

  const itemCount = computed(() => cart.value.reduce((n, i) => n + i.quantity, 0))
  const total = computed(() => cart.value.reduce((n, i) => n + i.price * i.quantity, 0))

  const persist = () => {
    if (process.client) localStorage.setItem(STORAGE_KEY, JSON.stringify(cart.value))
  }

  const hydrate = () => {
    if (!process.client || cart.value.length > 0) return
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) cart.value = JSON.parse(stored)
    } catch {}
  }

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    const existing = cart.value.find(i => i.id === item.id && i.size === item.size)
    if (existing) {
      existing.quantity++
    } else {
      cart.value = [...cart.value, { ...item, quantity: 1 }]
    }
    isOpen.value = true
    persist()
  }

  const removeItem = (id: string, size: string) => {
    cart.value = cart.value.filter(i => !(i.id === id && i.size === size))
    persist()
  }

  const updateQty = (id: string, size: string, qty: number) => {
    if (qty < 1) { removeItem(id, size); return }
    const item = cart.value.find(i => i.id === id && i.size === size)
    if (item) { item.quantity = qty; persist() }
  }

  const clear = () => {
    cart.value = []
    persist()
  }

  return { cart, isOpen, itemCount, total, addItem, removeItem, updateQty, clear, hydrate }
}
