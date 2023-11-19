import { Comment, Home } from '@mui/icons-material';
import { Breadcrumbs, IconButton } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { getAllDocument, getDocument } from '@/utils/firebase';

import CartButton from './CartButton';
import { categoryList } from '../../constants';

export async function generateStaticParams() {
  const docs = (await getAllDocument('paints')).result?.docs;

  return docs!.map((doc) => ({
    id: doc.id,
    category: doc.data().category,
  }));
}

export default async function PaintDetail({ params }: { params: { category: string; id: string } }) {
  const res = await getDocument('paints', params.id);
  let image: PaintType | null = null;

  if (res.result) {
    image = { id: params.id, ...res.result.data() } as PaintType;
  }

  if (!image) return null;
  else
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
            {categoryList.find(({ path }) => path === image!.category)?.name}
          </Link>
          <Link href={`/gallery/${image.category}/${image.id}`} className="decoration-transparent text-gray-600 text-sm">
            {image.title}
          </Link>
        </Breadcrumbs>
        <div className="flex justify-center mt-5">
          <div className="flex flex-wrap sm:justify-between justify-center bg-white rounded-xl max-w-4xl shadow-2xl">
            <Image
              alt="image"
              width={image.width * 100}
              height={image.height * 100}
              src={image.url}
              className="w-8/12 h-fit max-w-3xl min-w-[300px] sm:rounded-xl rounded-none"
            />
            <div className="p-2 flex flex-col justify-between w-full sm:w-fit">
              <div className="">
                <h1 className="font-extrabold text-2xl">{image.title}</h1>
                <b>{image.year}</b>
                <p className="mb-5">
                  Dimensions: {image.width} × {image.height} cm
                </p>
                <b>Price: {image.price}€</b>
                {image.stock > 0 ? (
                  <p>Available quantity: {image.stock}</p>
                ) : (
                  <p className={'text-xl font-extrabold text-red-500'}>SOLD OUT</p>
                )}
              </div>
              <div className="flex justify-between">
                <IconButton>
                  <Comment />
                </IconButton>

                <CartButton image={image} />
              </div>
            </div>
          </div>
        </div>
        <Image
          src={image.url}
          alt="image"
          loading="lazy"
          width={image.width * 100}
          height={image.height * 100}
          className="absolute bottom-0 right-0 z-[-10] w-full mix-blend-darken opacity-10 blur-sm"
        />
      </>
    );
}
