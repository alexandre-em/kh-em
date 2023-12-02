'use client';
import { Image } from '@mui/icons-material';
import { Alert, Button, CircularProgress, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import React, { useCallback, useState } from 'react';

import { addDataToDb, uploadFile } from '@/utils/firebase';

export default function Dashboard() {
  const [formValue, setFormValue] = useState<Record<string, string | number>>();
  const [image, setImage] = useState<File | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUploadSuccess, setIsUploadSuccess] = useState<'success' | 'error' | undefined>();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (image && !isLoading) {
        setIsLoading(true);
        const buffer = await image.arrayBuffer();
        const resUploadImage = await uploadFile(image.name, buffer);

        if (!resUploadImage.error) {
          const res = await addDataToDb('paints', {
            ...formValue,
            url: resUploadImage.result,
          });

          setIsLoading(false);
          if (!res.error) {
            setIsUploadSuccess('success');
          } else {
            setIsUploadSuccess('error');
          }
        } else {
          setIsUploadSuccess('error');
        }
      }
    },
    [formValue, image, isLoading]
  );

  const handleChange = useCallback((key: string, value: string | number) => {
    setFormValue((prev) => ({ ...prev, [key]: value }));
  }, []);

  return (
    <div className="flex-1 bg-gray-800 h-full overflow-y-auto">
      <form className="bg-white flex flex-1 flex-col p-5" onSubmit={handleSubmit}>
        <h1 className="font-black text-2xl text-gray-800">Nouveau tableau</h1>
        {image && (
          <img
            src={URL.createObjectURL(image!)}
            alt="img"
            className="flex flex-[0.25] self-center rounded-3xl object-contain max-w-md max-h-64 m-5"
            loading="lazy"
          />
        )}
        <div className="mt-5 mb-5 cursor-pointer">
          <label htmlFor="upload-file">
            <input
              type="file"
              id="upload-file"
              name="upload-file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files![0])}
              style={{ display: 'none' }}
            />
            <div className="flex text-[#536DFE] cursor-pointer">
              <Image />
              <p>Selectionner image...&nbsp;</p>
            </div>
          </label>
          <span style={{ color: '#b4b4b4', fontSize: '10pt' }}>
            {image ? 'Selection: ' + image.name : 'Aucune image selectionnee'}
          </span>
        </div>
        <FormControl className="bg-white mb-5">
          <InputLabel>Titre</InputLabel>
          <OutlinedInput
            required
            label="title"
            value={formValue?.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </FormControl>
        <FormControl className="bg-white mb-5">
          <InputLabel>Annee</InputLabel>
          <OutlinedInput
            required
            label="year"
            value={formValue?.year}
            type="number"
            onChange={(e) => handleChange('year', parseInt(e.target.value))}
          />
        </FormControl>
        <FormControl className="bg-white mb-5">
          <InputLabel>Categorie</InputLabel>
          <OutlinedInput
            required
            label="category"
            value={formValue?.category}
            onChange={(e) => handleChange('category', e.target.value)}
          />
        </FormControl>
        <FormControl className="bg-white mb-5">
          <InputLabel>Longueur</InputLabel>
          <OutlinedInput
            required
            label="width"
            endAdornment={<InputAdornment position="end">cm</InputAdornment>}
            value={formValue?.width}
            type="number"
            onChange={(e) => handleChange('width', parseInt(e.target.value))}
          />
        </FormControl>
        <FormControl className="bg-white mb-5">
          <InputLabel>Largeur</InputLabel>
          <OutlinedInput
            required
            label="height"
            endAdornment={<InputAdornment position="end">cm</InputAdornment>}
            value={formValue?.height}
            type="number"
            onChange={(e) => handleChange('height', parseInt(e.target.value))}
          />
        </FormControl>
        <FormControl className="bg-white mb-5">
          <InputLabel>Prix</InputLabel>
          <OutlinedInput
            label="price"
            endAdornment={<InputAdornment position="end">€</InputAdornment>}
            value={formValue?.price}
            type="number"
            onChange={(e) => handleChange('price', parseInt(e.target.value))}
          />
        </FormControl>
        <FormControl className="bg-white mb-5">
          <InputLabel>Quantite</InputLabel>
          <OutlinedInput
            required
            label="stock"
            value={formValue?.stock}
            type="number"
            onChange={(e) => handleChange('stock', parseInt(e.target.value))}
          />
        </FormControl>
        <Button type="submit" variant="outlined" disabled={isLoading}>
          Envoyer
          {isLoading && <CircularProgress className="ml-2" size={20} />}
        </Button>
        {isUploadSuccess && (
          <Alert className="mt-5" severity={isUploadSuccess}>
            {isUploadSuccess === 'success' ? 'Upload Succeed !' : 'Error in uploading'}
          </Alert>
        )}
      </form>
    </div>
  );
}
