import { Home } from '@mui/icons-material';
import { Breadcrumbs, IconButton, ImageList, ImageListItem, Skeleton } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { getDocumentByField } from '@/utils/firebase';

import { categoryList } from '../constants';

export function generateStaticParams() {
  return categoryList.map(({ path }) => ({
    category: path,
  }));
}

export default async function Category({ params }: { params: { category: string } }) {
  const res = await getDocumentByField('paints', 'category', params.category);
  let images: PaintType[] = [];
  if (res.result) {
    images = res.result.docs.map((v) => ({ ...v.data(), id: v.id })) as PaintType[];
  }

  return (
    <>
      <Breadcrumbs separator="›">
        <IconButton href="/">
          <Home />
        </IconButton>
        <Link href="/gallery" className="decoration-transparent text-gray-600 text-sm">
          Gallerie
        </Link>
        <Link href={`/gallery/${params.category}`} className="decoration-transparent text-gray-600 text-sm">
          {categoryList.find(({ path }) => path === params.category)?.name}
        </Link>
      </Breadcrumbs>
      <h1 className="font-black text-2xl text-gray-800">{categoryList.find(({ path }) => path === params.category)?.name}</h1>
      {images.length > 0 ? (
        <ImageList variant="masonry" cols={3} gap={8}>
          {images.map((item) => (
            <ImageListItem key={item.url}>
              <Link href={`/gallery/${params.category}/${item.id}`}>
                <Image
                  src={item.url}
                  alt={item.id}
                  width={item.width * 100}
                  height={item.height * 100}
                  className="shadow-lg border-gray-700 border-[1px] border-opacity-40"
                />
              </Link>
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <div className="flex flex-wrap">
          {Array.from(Array(10).keys()).map((_, i) => (
            <Skeleton variant="rectangular" key={`skeleton-${i}`} width={210} height={118} className="m-3" />
          ))}
        </div>
      )}
    </>
  );
}
