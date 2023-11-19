'use client';
import { Button } from '@mui/material';
import React from 'react';

import { useStore } from '@/providers/useStore';

export default function CartButton({ image }: { image: PaintType }) {
  const storeContext = useStore();

  const isProductInBasket = image && storeContext && storeContext.cart.find((article) => article.item.id === image.id);

  const handleUpdateBasket = () => {
    if (image) {
      if (!isProductInBasket) {
        storeContext!.dispatch('ADD_ITEM_CART', { item: image, quantity: 1 });
      } else {
        if (storeContext && image) {
          storeContext!.dispatch('REMOVE_ITEM_CART', {
            item: image,
            quantity: 0,
          });
        }
      }
    }
  };

  return storeContext?.cart.find((item) => item.item.id === image.id) ? (
    <Button variant="outlined" color="error" onClick={handleUpdateBasket} disabled={image.stock <= 0}>
      Remove item
    </Button>
  ) : (
    <Button variant="contained" className="bg-[#2196f3]" onClick={handleUpdateBasket} disabled={image.stock <= 0}>
      Add item
    </Button>
  );
}
