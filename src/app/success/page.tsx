'use client';
import { Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Stripe from 'stripe';

import Linksgroup from '@/components/Linksgroup';
import Navbar from '@/components/Navbar';
import { updateItemDataQuery } from '@/utils/firebase';

import OrderConfirmed from './order_confirmed.svg';

export default function Success() {
  const searchParams = useSearchParams();
  const [invoice, setInvoice] = useState<Stripe.Response<Stripe.Invoice>>();

  // Getting invoice information
  useEffect(() => {
    const sessionId = searchParams.get('session_id');

    axios.get(`/api/checkout-sessions?session_id=${sessionId}`).then((session) => {
      axios.get(`/api/invoice?invoice_id=${session.data.invoice}`).then((invoice) => {
        setInvoice(invoice.data);

        updateItemDataQuery('transactions', { key: 'id', value: sessionId! }, { pdf: invoice.data.hosted_invoice_url });
      });
    });
  }, [searchParams]);

  return (
    <div>
      <Navbar />
      <div className="m-5 flex flex-col items-center">
        <div className="font-black text-3xl flex flex-wrap">
          <span>Commande effectué avec&nbsp;</span>
          <span className="text-[#536DFE]">succès</span>
        </div>
        <i className="text-gray-500 font-thin">Si vous avez des questions, n&apos;hesitez pas à me contacter !</i>
        <Linksgroup title={false} />
        <Button
          variant="contained"
          className="bg-[#2196f3] mt-3"
          href={invoice?.hosted_invoice_url as string}
          disabled={!!!invoice}>
          {!!!invoice ? 'Loading...' : 'Facture'}
          {!!!invoice && <CircularProgress className="ml-3" size={15} />}
        </Button>
        <Image priority src={OrderConfirmed} alt="img" className="w-8/12 max-w-sm min-w-[200px] mt-10" />
      </div>
    </div>
  );
}
