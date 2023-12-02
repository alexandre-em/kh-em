'use client';
import { AddPhotoAlternate, Newspaper, Restore } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Button, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';

import Navbar from '@/components/Navbar';
import { useAdminContext } from '@/providers/admin.provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState('');
  const [value, setValue] = useState('');
  const router = useRouter();
  const adminContext = useAdminContext();

  const handleNavigate = useCallback(
    (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
      setValue(newValue);
      router.push(newValue);
    },
    [router]
  );

  if (!adminContext?.isConnected) {
    return (
      <main className="bg-gray-400 h-full" style={{ fontFamily: 'roboto' }}>
        <Navbar />
        <div className="flex justify-center items-center h-full">
          <form
            className="flex flex-col bg-white p-5 rounded-lg w-3/4"
            onSubmit={() => adminContext?.dispatch('LOGIN', { password })}>
            <h1 className="font-black text-2xl text-gray-800">Mot de passe</h1>
            <FormControl className="bg-white mt-5 mb-5">
              <InputLabel>Mot de passe</InputLabel>
              <OutlinedInput
                required
                label="year"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" variant="outlined" disabled={!!!password}>
              Connecter
            </Button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main style={{ fontFamily: 'roboto' }} className="overflow-x-hidden h-[calc(100%-56px)]">
      <Navbar />
      <div className="flex m-3">{children}</div>
      <BottomNavigation showLabels className="absolute bottom-0 right-0 left-0" value={value} onChange={handleNavigate}>
        <BottomNavigationAction label="Commandes" value="/dashboard/orders" icon={<Restore />} />
        <BottomNavigationAction label="Nouveau tableau" value="/dashboard/upload" icon={<AddPhotoAlternate />} />
        <BottomNavigationAction label="Nouvelles" value="/dashboard/news" icon={<Newspaper />} />
      </BottomNavigation>
    </main>
  );
}
