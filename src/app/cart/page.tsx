'use client';
import { Button, Divider, TextField } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useMemo } from 'react';

import Footer from '@/components/Footer';
import Linksgroup from '@/components/Linksgroup';
import Navbar from '@/components/Navbar';
import { useStore } from '@/providers/store.provider';
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
      <>
        <Navbar />
        <div className="m-5 min-h-[calc(100dvh-162px)] flex flex-col items-center justify-center">
          <div className="font-black text-3xl flex flex-wrap">
            <span>Votre panier est&nbsp;</span>
            <span className="text-[#536DFE]">vide</span>
          </div>
          <i className="text-gray-500 font-thin">Si vous avez des questions, n&apos;hesitez pas à me contacter !</i>
          <Linksgroup title={false} />
          <Image priority src={EmptyCart} alt="img" className="w-8/12 max-w-sm min-w-[200px] mt-10" />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <main className="h-full overflow-y-auto">
      <Navbar />
      <div className="flex flex-wrap justify-center">
        {/* left */}
        <div className="max-sm:flex-1 flex-[0.85] bg-white m-5 p-2 rounded-lg h-[calc(100vh-172px)] min-w-[250px] overflow-y-scroll">
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
        <div className="max-sm:flex-1 flex-[0.2] min-w-[200px] max-w-xs bg-white m-5 p-2 rounded-lg h-fit">
          <h2 className="font-extrabold text-lg">Total</h2>
          <Divider className="mt-1 mb-1" />
          <div className="flex justify-between">
            <h3 className="text-xs">Total HT</h3>
            <h3 className="text-xs">{totalPrice * 0.8}€</h3>
          </div>
          <div className="flex justify-between">
            <h3 className="text-xs">TVA</h3>
            <h3 className="text-xs">{totalPrice * 0.2}€</h3>
          </div>
          <Divider className="mt-1 mb-1" />
          <div className="flex justify-between">
            <h3 className="text-sm font-bold">Total TTC</h3>
            <h3 className="text-sm font-bold">{totalPrice}€</h3>
          </div>
          <Button variant="contained" className="bg-[#2196f3] mt-3" onClick={handleCheckout}>
            Checkout
          </Button>
        </div>
      </div>
      <Footer />
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
