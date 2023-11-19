import { Button, ImageList, ImageListItem } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { categoryList } from './constants';

function CategoryPreview({ category }: { category: (typeof categoryList)[0] }) {
  return (
    <div className="self-center mb-2">
      <div className="flex justify-between">
        <h2 className="font-bold text-gray-700 text-xl">{category.name}</h2>
        <Button>
          <Link href={`/gallery/${category.path}`}>See more...</Link>
        </Button>
      </div>
      <ImageList sx={{ maxWidth: 700, width: '100%' }} cols={3} rowHeight={164}>
        {category.images.map((item) => (
          <ImageListItem key={item.id} className="mb-5">
            <Link href={`/gallery/${category.path}/${item.id}`}>
              <Image
                src={item.url}
                alt="pic"
                loading="lazy"
                width={150}
                height={150}
                className="w-[164px] h-[164px] object-cover"
              />
            </Link>
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default function Gallery() {
  return (
    <>
      <div>
        <h1 className="font-black text-2xl text-gray-800">Gallery</h1>
        <i className="font-thin text-sm text-gray-500">
          Here is all of my works with their informations. If you are interested in buying one (or more) of them, please send me
          an email with the(ir) link(s) to check their availabilities.
        </i>
      </div>
      <div className="flex flex-col justify-center">
        {categoryList.map((category) => (
          <CategoryPreview key={category.name} category={category} />
        ))}
      </div>
      <Image
        src="https://storage.googleapis.com/khindelvert-af786.appspot.com/uploads/bbe33726-8b68-4bb3-911a-7259757d6b6d/DSC00302_1000.png"
        alt="image"
        loading="lazy"
        width={300}
        height={400}
        className="absolute bottom-0 right-0 z-[-10] w-full mix-blend-darken opacity-10 blur-sm"
      />
    </>
  );
}
