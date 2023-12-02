import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

import { addDataToDb } from '@/utils/firebase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: '2023-10-16',
});

export async function POST(req: NextRequest) {
  const headersList = headers();
  const { cart } = await req.json();
  const cartArray: CartItemType[] = Object.values(cart) as CartItemType[];

  const lineItems = cartArray.map((item: CartItemType) => {
    return {
      price_data: {
        currency: 'EUR',
        product_data: {
          name: `${item.item.title}/${item.item.id}`,
          images: [item.item.url],
        },
        unit_amount: item.item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'paypal'],
      line_items: lineItems,
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['FR', 'IT', 'ES', 'PT', 'DE', 'BE', 'LU', 'GB', 'CH'],
      },
      success_url: `${headersList.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${headersList.get('origin')}/`,
      invoice_creation: {
        enabled: true,
      },
      locale: 'auto',
    });

    const data = {
      id: session.id,
      status: 'pending',
      total: cartArray.map((v) => v.item.price * v.quantity).reduce((prev, curr) => prev + curr, 0),
      paints: cartArray.map((item: CartItemType) => item.item),
      userInfo: null,
      date: new Date(),
    };

    await addDataToDb('transactions', data);

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: 'Error creating checkout session' });
  }
}

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id');

  const session = await stripe.checkout.sessions.retrieve(sessionId!);

  return NextResponse.json(session);
}
