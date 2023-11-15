"use client";
import React, { useCallback, useMemo } from "react";
import { Button, Divider, TextField } from "@mui/material";

import Navbar from "@/components/Navbar";
import { useStore } from "@/providers/useStore";
import EmptyCart from "./empty_cart.svg";
import Image from "next/image";
import Linksgroup from "@/components/Linksgroup";

export default function Cart() {
  const storeContext = useStore();

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      if (storeContext) {
        if (
          quantity > 0 &&
          quantity <= storeContext.cart.find(({ item }) => item.id)!.item.stock
        ) {
          // Checking if the quantity asked is available
          storeContext.dispatch("UPDATE_ITEM_CART_QUANTITY", {
            item: { id },
            quantity,
          });
        } else if (quantity === 0)
          // quantity = 0 so we remove the product
          storeContext.dispatch("REMOVE_ITEM_CART", {
            item: { id },
          });
      }
    },
    [storeContext]
  );

  console.log(storeContext);

  const totalPrice = useMemo(
    () =>
      storeContext?.cart.length
        ? storeContext?.cart
            .map((v) => v.item.price * v.quantity)
            .reduce((prev, curr) => prev + curr, 0)
        : 0,
    [storeContext]
  );

  if (!storeContext?.cart || storeContext.cart.length <= 0) {
    return (
      <div>
        <Navbar />
        <div className="m-5 flex flex-col items-center">
          <div className="font-black text-3xl flex">
            <h1>Your cart is &nbsp;</h1>
            <h1 className="text-[#536DFE]">empty</h1>
          </div>
          <i className="text-gray-500 font-thin">
            If you have any questions, don't hesitate to contact me !
          </i>
          <Linksgroup title={false} />
          <Image
            priority
            src={EmptyCart}
            alt="img"
            className="w-8/12 max-w-sm min-w-[200px] mt-10"
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-wrap">
        {/* left */}
        <div className="flex-[0.7] bg-white m-5 p-2 rounded-lg">
          <h1 className="font-extrabold text-lg">Articles</h1>
          <Divider className="mt-1 mb-1" />
          {storeContext.cart.length > 0 &&
            storeContext?.cart.map((item, i) => (
              <>
                <div
                  key={item.item.id}
                  className="flex flex-wrap justify-between items-center"
                >
                  <div className="flex flex-row h-full items-center">
                    <TextField
                      label="Quantity"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={
                        storeContext.cart.find(
                          (prod) => prod.item.id === item.item.id
                        )!.quantity
                      }
                      onChange={(e) =>
                        updateQuantity(
                          item.item.id,
                          parseInt(e.target.value as string)
                        )
                      }
                      className="w-[40px]"
                      variant="standard"
                    />
                    <div className="italic ml-3 text-sm">{item.item.title}</div>
                  </div>
                  <b className="text-sm">{item.item.price * item.quantity}€</b>
                </div>
                {i + 1 < storeContext.cart.length && (
                  <Divider className="mt-1 mb-1" />
                )}
              </>
            ))}
        </div>
        {/* right */}
        <div className="flex-[0.3] bg-white m-5 p-2 rounded-lg">
          <h1 className="font-extrabold text-lg">Total</h1>
          <Divider className="mt-1 mb-1" />
          <div className="flex justify-between">
            <h1 className="text-xs">Total HT</h1>
            <h1 className="text-xs">{totalPrice * 0.8}€</h1>
          </div>
          <div className="flex justify-between">
            <h1 className="text-xs">TVA</h1>
            <h1 className="text-xs">{totalPrice * 0.2}€</h1>
          </div>
          <Divider className="mt-1 mb-1" />
          <div className="flex justify-between">
            <h1 className="text-sm font-bold">Total TTC</h1>
            <h1 className="text-sm font-bold">{totalPrice}€</h1>
          </div>
          <Button variant="contained" className="bg-[#2196f3] mt-3">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}