import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

import { incrementStock, updateItemData } from '@/utils/firebase';

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
    case 'checkout.session.completed':
      console.log('checkout sessions completed');
      const checkoutSessionCompleted = event.data.object;

      const data = {
        userInfo: checkoutSessionCompleted.customer_details! as UserDetail,
        status: checkoutSessionCompleted.payment_status === 'unpaid' ? 'cancelled' : 'done',
      };

      await updateItemData('transactions', checkoutSessionCompleted.id, data);
      break;
    case 'invoice.payment_succeeded':
      console.log('invoice payment succeeded');
      const invoicePaymentSucceeded = event.data.object;
      // Then define and call a function to handle the event checkout.session.completed
      const products = invoicePaymentSucceeded.lines.data;
      // Updating each products quantity stock
      const promiseArray = products
        .map((prod) => {
          if (prod.description && prod.description.split('/').length > 0 && prod.quantity) {
            return incrementStock('paints', prod.description.split('/')[1]!, -1 * prod.quantity);
          }

          return null;
        })
        .filter((p) => p !== null);

      await Promise.allSettled(promiseArray);
      break;
    case 'checkout.session.expired':
      console.log('checkout sessions expired');
      const checkoutSessionExpired = event.data.object;

      await updateItemData('transactions', checkoutSessionExpired.id, {
        status: checkoutSessionExpired.payment_status === 'unpaid' ? 'cancelled' : 'done',
      });
      break;
    // ... handle other event types
    default:
      // console.info(`Unhandled event type ${event.type}`);
      return NextResponse.json({ error: `Webhook Error: Unhandled event type: ${event.type}` }, { status: 400 });
  }

  // Return a 200 response to acknowledge receipt of the event
  return NextResponse.json({ message: 'ok' });
}
