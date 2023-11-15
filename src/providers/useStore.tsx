"use client";
import React, { useCallback, useState } from "react";

type CartDispatchType =
  | "ADD_ITEM_CART"
  | "REMOVE_ITEM_CART"
  | "UPDATE_ITEM_CART_QUANTITY";
export type StoreDispatchType = CartDispatchType;

export type StoreValueType = {
  cart: {
    item: PaintType;
    quantity: number;
  }[];
  dispatch: (key: StoreDispatchType, value: any) => void;
};

type CartItemType = { item: PaintType; quantity: number };

const StoreContext = React.createContext<StoreValueType | null>(null);

// This hook can be used to access the user info.
export function useStore() {
  return React.useContext(StoreContext);
}

export function Provider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItemType[]>([]);

  const dispatch = useCallback(
    (type: StoreDispatchType, value: CartItemType) => {
      switch (type) {
        case "ADD_ITEM_CART":
          setCart((prev) => [
            ...prev,
            {
              item: value.item,
              quantity: value.quantity,
            },
          ]);
          break;
        case "REMOVE_ITEM_CART":
          setCart((prev) => prev.filter((p) => p.item.id !== value.item.id));
          break;
        case "UPDATE_ITEM_CART_QUANTITY":
          setCart((prev) =>
            prev.map((p) =>
              p.item.id === value.item.id
                ? { ...p, quantity: value.quantity }
                : p
            )
          );
          break;
        default:
          break;
      }
    },
    []
  );

  return (
    <StoreContext.Provider value={{ cart, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}
