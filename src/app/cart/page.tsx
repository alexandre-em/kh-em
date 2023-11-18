'use client';
import { Button, Divider, TextField } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useMemo } from 'react';

import Linksgroup from '@/components/Linksgroup';
import Navbar from '@/components/Navbar';
import { useStore } from '@/providers/useStore';
import getStripe from '@/utils/stripe';

import EmptyCart from './empty_cart.svg';

export default function Cart() {
  const storeContext = useStore();

  const updateQuantity = useCallback(
    (item: PaintType, quantity: number) => {
      if (storeContext) {
        if (quantity > 0 && quantity <= storeContext.cart.find(({ item }) => item.id)!.item.stock) {
          // Checking if the quantity asked is available
          storeContext.dispatch('UPDATE_ITEM_CART_QUANTITY', {
            item,
            quantity,
          });
        } else if (quantity === 0)
          // quantity = 0 so we remove the product
          storeContext.dispatch('REMOVE_ITEM_CART', {
            item,
            quantity: 0,
          });
      }
    },
    [storeContext]
  );

  const handleCheckout = useCallback(async () => {
    try {
      const stripe = await getStripe();

      if (!stripe) throw new Error('Stripe failed to initialize.');

      const session = await axios.post(
        '/api/checkout-sessions',
        { cart: storeContext!.cart },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log('session post', session);
      const stripeError = stripe?.redirectToCheckout({ sessionId: session.data.sessionId });

      if (stripeError) {
        console.error(stripeError);
      }
    } catch (e) {
      console.error(e);
    }
  }, [storeContext?.cart]);

  const totalPrice = useMemo(
    () =>
      storeContext?.cart.length
        ? storeContext?.cart.map((v) => v.item.price * v.quantity).reduce((prev, curr) => prev + curr, 0)
        : 0,
    [storeContext]
  );

  if (!storeContext?.cart || storeContext.cart.length <= 0) {
    return (
      <div>
        <Navbar />
        <div className="m-5 flex flex-col items-center">
          <div className="font-black text-3xl flex flex-wrap">
            <h1>Your cart is &nbsp;</h1>
            <h1 className="text-[#536DFE]">empty</h1>
          </div>
          <i className="text-gray-500 font-thin">If you have any questions, don&apos;t hesitate to contact me !</i>
          <Linksgroup title={false} />
          <Image priority src={EmptyCart} alt="img" className="w-8/12 max-w-sm min-w-[200px] mt-10" />
        </div>
      </div>
    );
  }

  return (
    <main className="h-full">
      <Navbar />
      <div className="flex flex-wrap">
        {/* left */}
        <div className="flex-[0.7] bg-white m-5 p-2 rounded-lg max-h-[calc(100vh-130px)] min-w-[330px] overflow-y-scroll">
          <h1 className="font-extrabold text-lg">Articles</h1>
          <Divider className="mt-1 mb-1" />
          {storeContext.cart.length > 0 &&
            storeContext?.cart.map((item, i) => (
              <>
                <div key={item.item.id} className="flex flex-wrap justify-between items-center hover:bg-gray-50 duration-300">
                  <div className="flex flex-row h-full items-center">
                    <TextField
                      label="Quantity"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={storeContext.cart.find((prod) => prod.item.id === item.item.id)!.quantity}
                      onChange={(e) => updateQuantity(item.item, parseInt(e.target.value as string))}
                      className="w-[40px]"
                      variant="standard"
                    />
                    <Link href={`/gallery/${item.item.category}/${item.item.id}`} className="italic ml-3 text-sm">
                      {item.item.title}
                    </Link>
                  </div>
                  <b className="text-sm">{item.item.price * item.quantity}€</b>
                </div>
                {i + 1 < storeContext.cart.length && <Divider className="mt-1 mb-1" />}
              </>
            ))}
        </div>
        {/* right */}
        <div className="flex-[0.3] bg-white m-5 p-2 rounded-lg h-fit">
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
          <Button variant="contained" className="bg-[#2196f3] mt-3" onClick={handleCheckout}>
            Checkout
          </Button>
        </div>
      </div>
      <Image
        src="https://storage.googleapis.com/khindelvert-af786.appspot.com/uploads/2e8d4fc0-594b-4751-80da-29c9176ef0ed/MYSTERE-30x45-2014_1000.png"
        alt="image"
        loading="lazy"
        width={300}
        height={400}
        className="absolute bottom-0 right-0 z-[-10] w-full mix-blend-darken opacity-10 blur-md"
      />
    </main>
  );
}
