import { CartState } from "@/lib/types";
import { ROUTES } from "@/routes";
import { create } from "zustand";

export const useCartStore = create<CartState>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  addItemToCart: async (userId, item) => {
    if (userId) {
      const res = await fetch(ROUTES.POST_CART_ADD, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      const data = await res.json();
      set((state) => {
        const existingIndex = state.items.findIndex(
          (i) => i.product.id === data.product.id && i.size === data.size,
        );
        if (existingIndex !== -1) {
          const updatedItems = [...state.items];
          updatedItems[existingIndex] = data;
          return { items: updatedItems };
        } else {
          return { items: [...state.items, data] };
        }
      });
    } else {
      set((state) => {
        const existingIndex = state.items.findIndex(
          (i) => i.product.id === item.product.id && i.size === item.size,
        );
        let updatedItems = [...state.items];
        if (existingIndex !== -1) {
          updatedItems[existingIndex].quantity += item.quantity;
        } else {
          const newItem = { ...item, id: crypto.randomUUID() };
          updatedItems = [...state.items, newItem];
        }
        localStorage.setItem("cart", JSON.stringify(updatedItems));
        return { items: updatedItems };
      });
    }
  },
  removeItemFromCart: (id) => {},
  loadCart: async (userId) => {
    if (userId) {
      const res = await fetch(ROUTES.GET_CART);
      const data = await res.json();
      set({ items: data.items });
    } else if (typeof window !== "undefined") {
      const local = localStorage.getItem("cart");
      if (local) {
        set({ items: JSON.parse(local) });
      }
    }
  },
}));
