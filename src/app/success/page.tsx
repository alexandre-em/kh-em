'use client';
import { Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Stripe from 'stripe';

import Linksgroup from '@/components/Linksgroup';
import Navbar from '@/components/Navbar';

import OrderConfirmed from './order_confirmed.svg';

export default function Success() {
  const searchParams = useSearchParams();
  const [invoice, setInvoice] = useState<Stripe.Response<Stripe.Invoice>>();

  // Getting invoice information
  useEffect(() => {
    const sessionId = searchParams.get('session_id');

    axios.get(`/api/checkout-sessions?session_id=${sessionId}`).then((session) => {
      axios.get(`/api/invoice?invoice_id=${session.data.invoice}`).then((invoice) => setInvoice(invoice.data));
    });
  }, [searchParams]);

  return (
    <div>
      <Navbar />
      <div className="m-5 flex flex-col items-center">
        <div className="font-black text-3xl flex flex-wrap">
          <h1>Order successfully &nbsp;</h1>
          <h1 className="text-[#536DFE]">completed</h1>
        </div>
        <i className="text-gray-500 font-thin">If you have any questions, don&apos;t hesitate to contact me !</i>
        <Linksgroup title={false} />
        <Button
          variant="contained"
          className="bg-[#2196f3] mt-3"
          href={invoice?.hosted_invoice_url as string}
          disabled={!!!invoice}>
          {!!!invoice ? 'Loading...' : 'Get receipt'}
          {!!!invoice && <CircularProgress className="ml-3" size={15} />}
        </Button>
        <Image priority src={OrderConfirmed} alt="img" className="w-8/12 max-w-sm min-w-[200px] mt-10" />
      </div>
    </div>
  );
}
