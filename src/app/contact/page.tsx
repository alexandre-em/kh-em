'use client';
import { sendForm } from '@emailjs/browser';
import { Alert, AlertTitle, Button, CircularProgress, Divider, TextField } from '@mui/material';
import Image from 'next/image';
import React, { useCallback, useRef, useState } from 'react';

import Footer from '@/components/Footer';
import Linksgroup from '@/components/Linksgroup';
import Navbar from '@/components/Navbar';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [mailStatus, setMailStatus] = useState<'SUCCESS' | 'ERROR' | 'PENDING' | 'LOADING'>('PENDING');

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setMailStatus('LOADING');
      if (formRef.current)
        sendForm(
          process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID!,
          formRef.current,
          process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY!
        ).then(
          () => setMailStatus('SUCCESS'),
          () => setMailStatus('ERROR')
        );
    },
    [formRef]
  );

  return (
    <>
      <Navbar />
      <main>
        <div className="m-5 min-h-[calc(100vh-165px)] flex flex-col items-center justify-center">
          <div className="font-black text-gray-800 text-3xl flex flex-wrap">
            <span>Vous pouvez me contacter&nbsp;</span>
            <span className="text-[#536DFE]">ici</span>
          </div>
          <Linksgroup title={false} />
          <Divider className="w-[80%]" />
          <div className="font-black text-gray-800 text-2xl flex flex-wrap mt-3 mb-3">
            <span>Mais également via ce&nbsp;</span>
            <span className="text-[#536DFE]">formulaire&nbsp;</span>
          </div>
          <form ref={formRef} className="bg-white mt-3 p-5 rounded-2xl" onSubmit={handleSubmit}>
            {mailStatus === 'SUCCESS' && (
              <Alert severity="success">
                <AlertTitle>Mail sent successfully !</AlertTitle>I will reply you as soon as possible
              </Alert>
            )}
            {mailStatus === 'ERROR' && (
              <Alert severity="error">
                <AlertTitle>An error occured !</AlertTitle> Please try again in few minutes
              </Alert>
            )}
            <TextField label="Name" required name="name" variant="outlined" fullWidth sx={{ mb: 2, mt: 3 }} />
            <TextField label="Email" name="email" required variant="outlined" type="email" sx={{ mb: 3 }} fullWidth />
            <TextField
              required
              multiline
              fullWidth
              id="outlined-multiline-static"
              label="Message"
              name="message"
              rows={5}
              maxRows={10}
              placeholder="You can write your message here..."
            />
            <Button variant="contained" className="bg-[#2196f3] mt-5" type="submit" disabled={mailStatus === 'LOADING'}>
              {mailStatus === 'LOADING' ? 'Loading...' : 'Send mail'}
              {mailStatus === 'LOADING' && <CircularProgress className="ml-3" size={15} />}
            </Button>
          </form>
        </div>
        <Image
          src="https://storage.googleapis.com/khindelvert-af786.appspot.com/uploads/89f9e091-4a3b-4d5f-b15e-56fede75ee13/DSC00301_1000.png"
          alt="image"
          loading="lazy"
          width={560}
          height={760}
          className="absolute bottom-0 right-0 z-[-10] w-full mix-blend-darken opacity-[15%] blur-md"
        />
      </main>
      <Footer />
    </>
  );
}
