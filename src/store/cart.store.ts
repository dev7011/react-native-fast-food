import { create } from 'zustand'
import {CartCustomization, CartItemType, MenuItem} from "~/interfaces"
import dummyData from "~/lib/data";


function areCustomizationsEqual(
  a: CartCustomization[] = [],
  b: CartCustomization[] = []
): boolean {
  if (a.length !== b.length) return false;

  const aSorted = [...a].sort();
  const bSorted = [...b].sort();

  return aSorted.every((id, idx) => id === bSorted[idx]);
}

interface CartStore {
  cartItems: CartItemType[]
  cartCustomizationItems: CartCustomization[]

  addToCart: (menu: MenuItem) => void
  removeItem:  (id: string, customizations: CartCustomization[]) => void
  increaseQty: (id: string, customizations: CartCustomization[]) => void
  decreaseQty: (id: string, customizations: CartCustomization[]) => void

  clearCart?: () => void
  getTotalPrice: () => number
  getItemPrice: (cartItem: CartItemType) => number
  getItemUnitPrice: (cartItem: CartItemType)  => number
  getCustomizationPrice: (cartItem: CartItemType)  => number
  getTotalItems: () => number
}

const useCartStore = create<CartStore>()((set, get) => ({
  cartItems: [],

  cartCustomizationItems: dummyData.customizations,

  addToCart: (item) => set(
    (state: any) => {
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
    }
  ),

  removeItem: (id, customizations: CartCustomization[] = []) => {
    set({
      cartItems: get().cartItems.filter(
        (cartItem) =>
          !(
            cartItem.id === id &&
            areCustomizationsEqual(cartItem.customizations ?? [], customizations)
          )
      ),
    });
  },

  clearCart: () => set({ cartItems: [] }),

  increaseQty: (id, customizations = []) => {
    set({
      cartItems: get().cartItems.map((cartItem) =>
        cartItem.id === id &&
        areCustomizationsEqual(cartItem.customizations ?? [], customizations)
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ),
    });
  },

  decreaseQty: (id, customizations = []) => {
    set({
      cartItems: get()
        .cartItems.map((cartItem) =>
          cartItem.id === id &&
          areCustomizationsEqual(cartItem.customizations ?? [], customizations)
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0),
    });
  },

  getTotalItems: () => {
    return get().cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    )
  },

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