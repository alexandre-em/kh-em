'use client';
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

          console.log('res data', res);
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
    <div className="bg-gray-800 h-full flex justify-center items-center">
      <form className="bg-white flex flex-col p-5 rounded-xl" onSubmit={handleSubmit}>
        <FormControl>
          <InputLabel>Title</InputLabel>

          <OutlinedInput
            required
            label="title"
            value={formValue?.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </FormControl>
        <FormControl className="bg-white p-5 rounded-xl">
          <InputLabel>Year</InputLabel>
          <OutlinedInput
            required
            label="year"
            value={formValue?.year}
            type="number"
            onChange={(e) => handleChange('year', parseInt(e.target.value))}
          />
        </FormControl>
        <FormControl className="bg-white p-5 rounded-xl">
          <InputLabel>Category</InputLabel>
          <OutlinedInput
            required
            label="category"
            value={formValue?.category}
            onChange={(e) => handleChange('category', e.target.value)}
          />
        </FormControl>
        <FormControl className="bg-white p-5 rounded-xl">
          <InputLabel>Width</InputLabel>
          <OutlinedInput
            required
            label="width"
            endAdornment={<InputAdornment position="end">cm</InputAdornment>}
            value={formValue?.width}
            type="number"
            onChange={(e) => handleChange('width', parseInt(e.target.value))}
          />
        </FormControl>
        <FormControl className="bg-white p-5 rounded-xl">
          <InputLabel>Height</InputLabel>
          <OutlinedInput
            required
            label="height"
            endAdornment={<InputAdornment position="end">cm</InputAdornment>}
            value={formValue?.height}
            type="number"
            onChange={(e) => handleChange('height', parseInt(e.target.value))}
          />
        </FormControl>
        <FormControl className="bg-white p-5 rounded-xl">
          <InputLabel>Price</InputLabel>
          <OutlinedInput
            label="price"
            endAdornment={<InputAdornment position="end">€</InputAdornment>}
            value={formValue?.price}
            type="number"
            onChange={(e) => handleChange('price', parseInt(e.target.value))}
          />
        </FormControl>
        <FormControl className="bg-white p-5 rounded-xl">
          <InputLabel>Stock</InputLabel>
          <OutlinedInput
            required
            label="stock"
            value={formValue?.stock}
            type="number"
            onChange={(e) => handleChange('stock', parseInt(e.target.value))}
          />
        </FormControl>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files![0])} className="m-5" />
        <Button type="submit" variant="outlined" disabled={isLoading}>
          Submit
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
