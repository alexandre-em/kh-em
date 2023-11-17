import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: '2023-10-16',
});

export async function GET(req: NextRequest) {
  const invoiceId = req.nextUrl.searchParams.get('invoice_id');

  const invoice = await stripe.invoices.retrieve(invoiceId!);

  return NextResponse.json(invoice);
}
