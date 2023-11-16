'use client';
import { Comment, Home } from '@mui/icons-material';
import { Breadcrumbs, Button, IconButton } from '@mui/material';
import Link from 'next/link';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useStore } from '@/providers/useStore';
import { getDocument } from '@/utils/firebase';

import { categoryList } from '../../constants';

export default function PaintDetail({ params }: { params: { id: string } }) {
  const [image, setImage] = useState<PaintType>();
  const storeContext = useStore();

  const isProductInBasket = useMemo(
    () => image && storeContext && storeContext.cart.find((article) => article.item.id === image.id),
    [storeContext, image]
  );
  const handleUpdateBasket = useCallback(() => {
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
  }, [image, storeContext, isProductInBasket]);

  useEffect(() => {
    if (params.id) {
      getDocument('paints', params.id).then((res) => {
        if (res.result) {
          setImage({
            ...res.result.data(),
            id: params.id,
          } as PaintType);
        }
      });
    }
  }, [params.id]);

  console.log(storeContext);

  if (!image) return null;

  return (
    <>
      <Breadcrumbs separator="›">
        <IconButton href="/">
          <Home />
        </IconButton>
        <Link href="/gallery" className="decoration-transparent text-gray-600 text-sm">
          Gallery
        </Link>
        <Link href={`/gallery/${image.category}`} className="decoration-transparent text-gray-600 text-sm">
          {categoryList.find(({ path }) => path === image.category)?.name}
        </Link>
        <Link href={`/gallery/${image.category}/${image.id}`} className="decoration-transparent text-gray-600 text-sm">
          {image.title}
        </Link>
      </Breadcrumbs>
      <div className="flex flex-wrap sm:justify-between justify-center bg-white rounded-xl">
        <img alt="image" src={image.url} className="w-8/12 h-fit max-w-xl min-w-[300px] sm:rounded-xl rounded-none" />
        <div className="p-2 flex flex-col justify-between w-full sm:w-fit">
          <div className="">
            <h1 className="font-extrabold text-2xl">{image.title}</h1>
            <b>{image.year}</b>
            <p className="mb-5">
              Dimensions: {image.width} × {image.height} cm
            </p>
            <b>Price: {image.price}€</b>
            <p>Available quantity: {image.stock}</p>
          </div>
          <div className="flex justify-between">
            <IconButton>
              <Comment />
            </IconButton>
            <Button variant="outlined" onClick={handleUpdateBasket}>
              Add basket
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
