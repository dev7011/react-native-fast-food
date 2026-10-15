import { create } from 'zustand'
import {CartCustomization, CartItemType, MenuItem} from "../../interfaces"
import dummyData from "../../lib/data";

interface CartStore {
  cartItems: CartItemType[]
  cartCustomizationItems: CartCustomization[]

  addToCart: (menu: MenuItem) => void
  removeFromCart?: (menu: MenuItem) => void
  clearCart?: () => void
  getTotalPrice: () => number
  getItemPrice: (cartItem: CartItemType) => number
  getItemUnitPrice: (cartItem: CartItemType)  => number
  getCustomizationPrice: (cartItem: CartItemType)  => number

  increaseQty: (id: string, qty: number) => void
  decreaseQty: (id: string, qty: number) => void
}

const useCartStore = create<CartStore>()((set, get) => ({
  cartItems: [],

  cartCustomizationItems: dummyData.customizations,

  addToCart: (item) => set((state: any) => {
      const existingItem = state.cartItems.find(
        (cartItem: CartItemType) => cartItem.id === item.id
      )

      if (existingItem) {
        return {
          cartItems: state.cartItems.map((cartItem: CartItemType) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        }
      }
      // add a new item
      return {
        cartItems: [...state.cartItems, { ...item, quantity: 1 }],
      }
    }),

  removeFromCart: (item) => set((state) => ({
      cartItems: state.cartItems.filter(
        (cartItem) => cartItem.id !== item.id
      ),
    })),

  clearCart: () => set({ cartItems: [] }),

  increaseQty: (id: string, qty: number) =>
    set((state: CartStore) => ({
      cartItems: state.cartItems.map((cartItem: CartItemType) =>
        cartItem.id === id
          ? { ...cartItem, quantity: cartItem.quantity + qty }
          : cartItem
      ),
    })),

  decreaseQty: (id: string, qty: number) =>
    set((state: CartStore) => ({
      cartItems: state.cartItems.map((cartItem: CartItemType) =>
        cartItem.id === id
          ? { ...cartItem, quantity: cartItem.quantity - qty }
          : cartItem
      ),
    })),

  getTotalItems: () => get().cartItems.reduce((total, cartItem) => total + cartItem.quantity , 0),

  getTotalPrice: () => {
    return get().cartItems.reduce((total, cartItem) => {
      const base = cartItem.price
      const customPrice = get().getCustomizationPrice(cartItem)

      return total + cartItem.quantity * (base + customPrice);
    }, 0);
  },

  getItemPrice: (cartItem) => {
    return cartItem.price * cartItem.quantity;
  },

  getItemUnitPrice: (cartItem: CartItemType): number => {
    const customPrice = get().getCustomizationPrice(cartItem)

    return cartItem.price + customPrice;
  },

  getCustomizationPrice: (cartItem: CartItemType): number => {
    return (
      cartItem.customizations?.reduce((total, customizationId) => {
        const customization = get().cartCustomizationItems.find(
          (item) => item.id === customizationId.toString()
        );

        return total + (customization?.price ?? 0);
      }, 0) ?? 0
    );
  },

}))

export default useCartStore