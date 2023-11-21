'use client';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';

import { images } from './constants';

export default function Home() {
  const [i, setI] = useState(0);

  const handlePrev = useCallback(() => {
    if (i <= 0) {
      setI(images.length - 1);
    } else {
      setI((prev) => prev - 1);
    }
  }, [i]);

  const handleNext = useCallback(() => {
    if (i >= images.length - 1) {
      setI(0);
    } else {
      setI((prev) => prev + 1);
    }
  }, [i]);

  return (
    <main className="flex h-full justify-center items-center">
      <div className="flex flex-row flex-wrap items-end justify-evenly w-3/5">
        <Link href={`/gallery/${images[i].category}/${images[i].id}`}>
          <Image
            src={images[i].url}
            alt="image"
            loading="lazy"
            width={images[i].width}
            height={images[i].height}
            className="shadow-2xl mb-5 max-w-[400px] min-w-[250px] border-gray-900 border-[2px] border-opacity-70"
          />
        </Link>
        <div className="flex flex-col min-w-fit bg-white p-3 w-1/4 shadow-md mb-5">
          <b className="text-lg font-extrabold">Khindelvert Em</b>
          <i className="opacity-75 text-sm font-light mb-2">
            {images[i].title}, {images[i].year}
          </i>
          <Link href="/" className="duration-200 font-medium text-zinc-950 hover:text-zinc-500" style={{ fontFamily: 'roboto' }}>
            Accueil
          </Link>
          <Link
            href="/gallery"
            className="duration-200 font-medium text-zinc-950 hover:text-zinc-500"
            style={{ fontFamily: 'roboto' }}>
            Gallerie
          </Link>
          <Link
            href="/profile"
            className="duration-200 font-medium text-zinc-950 hover:text-zinc-500"
            style={{ fontFamily: 'roboto' }}>
            Profile
          </Link>
          <Link
            href="/contact"
            className="duration-200 font-medium text-zinc-950 hover:text-zinc-500"
            style={{ fontFamily: 'roboto' }}>
            Contact
          </Link>

          <div className="flex flex-row mt-2 justify-between">
            <IconButton onClick={handlePrev}>
              <ChevronLeft />
            </IconButton>
            <IconButton onClick={handleNext}>
              <ChevronRight />
            </IconButton>
          </div>
        </div>
      </div>
      <Image
        src="https://storage.googleapis.com/khindelvert-af786.appspot.com/uploads/0038ab85-af9d-4067-b597-42deadcf6e93/Image44-copie_1000.png"
        alt="image"
        loading="lazy"
        width={500}
        height={650}
        className="absolute bottom-0 right-0 z-[-10] w-full mix-blend-darken opacity-[15%] blur-sm animate-kenburns-top"
      />
    </main>
  );
}
