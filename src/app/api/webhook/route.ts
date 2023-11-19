import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

import { incrementStock } from '@/utils/firebase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: '2023-10-16',
});

const endpointSecret =
  process.env.STRIPE_ENDPOINT_SECRET || 'whsec_ec7b4786af285566bc6e293a30a38218e097949c5c26ad662eaa3c88946d5e31';

export async function POST(req: NextRequest) {
  const headersList = headers();
  const sig = headersList.get('stripe-signature');

  let event;

  const body = await req.text();

  try {
    event = stripe.webhooks.constructEvent(body, sig!, endpointSecret);
    // eslint-disable-next-line
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'invoice.payment_succeeded':
      const checkoutSessionCompleted = event.data.object;
      // Then define and call a function to handle the event checkout.session.completed
      const products = checkoutSessionCompleted.lines.data;

      // Updating each products quantity stock
      products.forEach(async (prod) => {
        if (prod.description && prod.description.split('/').length > 0 && prod.quantity) {
          await incrementStock('paints', prod.description.split('/')[1]!, -prod.quantity);
        }
      });

      break;
    // ... handle other event types
    default:
      console.info(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  return NextResponse.json({ message: 'ok' });
}
