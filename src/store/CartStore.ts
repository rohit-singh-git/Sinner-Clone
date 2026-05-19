import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
    id: string;
    slug: string;
    name: string;
    price: number;
    image: string;
    size: string;
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string, size: string) => void;
    updateQuantity: (id: string, size: string, quantity: number) => void;
    clearCart: () => void;
    total: () => number;
    count: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item) => {
                const existing = get().items.find(
                    (i) => i.id === item.id && i.size === item.size,
                );
                if (existing) {
                    set((s) => ({
                        items: s.items.map((i) =>
                            i.id === item.id && i.size === item.size
                                ? { ...i, quantity: i.quantity + 1 }
                                : i,
                        ),
                    }));
                } else {
                    set((s) => ({
                        items: [...s.items, { ...item, quantity: 1 }],
                    }));
                }
            },

            removeItem: (id, size) =>
                set((s) => ({
                    items: s.items.filter(
                        (i) => !(i.id === id && i.size === size),
                    ),
                })),

            updateQuantity: (id, size, quantity) => {
                if (quantity < 1) return;
                set((s) => ({
                    items: s.items.map((i) =>
                        i.id === id && i.size === size ? { ...i, quantity } : i,
                    ),
                }));
            },

            clearCart: () => set({ items: [] }),

            total: () =>
                get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

            count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
        }),
        { name: "sinner-cart" },
    ),
);
