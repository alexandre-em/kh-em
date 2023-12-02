'use client';
import { Alert, Button, CircularProgress, FormControl, InputLabel, OutlinedInput, TextField } from '@mui/material';
import React, { useCallback, useState } from 'react';

import { addDataToDb } from '@/utils/firebase';

export default function Dashboard() {
  const [formValue, setFormValue] = useState<Record<string, string | number>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<'pending' | 'error' | 'success'>('pending');

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!isLoading) {
        setIsLoading(true);
        try {
          await addDataToDb('news', {
            ...formValue,
            date: new Date(),
          });
          setStatus('success');
        } catch (e) {
          setStatus('error');
        } finally {
          setIsLoading(false);
        }
      }
    },
    [formValue, isLoading]
  );

  const handleChange = useCallback((key: string, value: string | number) => {
    setFormValue((prev) => ({ ...prev, [key]: value }));
  }, []);

  return (
    <div className="flex-1 bg-gray-800 h-full overflow-y-auto">
      <form className="bg-white flex flex-1 flex-col p-5" onSubmit={handleSubmit}>
        <h1 className="font-black text-2xl text-gray-800 mb-5">Ajouter une nouvelle</h1>
        <FormControl className="bg-white mb-5">
          <InputLabel>Titre *</InputLabel>
          <OutlinedInput
            required
            label="title"
            value={formValue?.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </FormControl>
        <FormControl className="bg-white mb-5">
          <InputLabel>Localisation</InputLabel>
          <OutlinedInput
            label="location"
            value={formValue?.location}
            onChange={(e) => handleChange('location', e.target.value)}
          />
        </FormControl>
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
          onChange={(e) => handleChange('message', e.target.value)}
        />
        <Button className="mt-5" type="submit" variant="outlined" disabled={isLoading}>
          Envoyer
          {isLoading && <CircularProgress className="ml-2" size={20} />}
        </Button>
        {status !== 'pending' && (
          <Alert className="mt-5" severity={status}>
            {status === 'success' ? 'Nouvelle ajoute avec Succes !' : 'Il y a une Erreur, veuillez essayer plus tard.'}
          </Alert>
        )}
      </form>
    </div>
  );
}
