'use client';
import React, { createContext, useCallback, useContext, useState } from 'react';

type CartDispatchType = 'ADD_ITEM_CART' | 'REMOVE_ITEM_CART' | 'UPDATE_ITEM_CART_QUANTITY';
export type StoreDispatchType = CartDispatchType;

type CartItemType = { item: PaintType; quantity: number };
type PayloadType = CartItemType;

export type StoreValueType = {
  cart: CartItemType[];
  dispatch: (key: StoreDispatchType, payload: PayloadType) => void;
};

const StoreContext = createContext<StoreValueType | null>(null);

// This hook can be used to access the user info.
export function useStore() {
  return useContext(StoreContext);
}

export function Provider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItemType[]>([]);

  const dispatch = useCallback((type: StoreDispatchType, payload: PayloadType) => {
    switch (type) {
      case 'ADD_ITEM_CART':
        setCart((prev) => [
          ...prev,
          {
            item: payload.item,
            quantity: payload.quantity,
          },
        ]);
        break;
      case 'REMOVE_ITEM_CART':
        setCart((prev) => prev.filter((p) => p.item.id !== payload.item.id));
        break;
      case 'UPDATE_ITEM_CART_QUANTITY':
        setCart((prev) => prev.map((p) => (p.item.id === payload.item.id ? { ...p, quantity: payload.quantity } : p)));
        break;
      default:
        break;
    }
  }, []);

  return <StoreContext.Provider value={{ cart, dispatch }}>{children}</StoreContext.Provider>;
}
