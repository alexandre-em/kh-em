import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex h-full justify-center items-center">
      <div className="flex flex-row flex-wrap items-end justify-evenly w-3/5">
        <Image
          src="https://storage.googleapis.com/khindelvert-af786.appspot.com/uploads/de70c124-b24a-4a24-984b-bab4afcf9abb/01-Les-poires-50x65-2005_627.jpg"
          alt="image"
          loading="lazy"
          width={500}
          height={650}
          className="shadow-2xl mb-5 max-w-[400px] min-w-[250px]"
        />
        <div className="flex flex-col min-w-fit bg-white p-3 w-1/4 shadow-md mb-5">
          <b className="text-lg font-extrabold">Khindelvert Em</b>
          <i className="opacity-75 text-sm font-light mb-2">Femme girafe, 2009</i>
          <Link href="/" className="duration-200 font-medium text-zinc-950 hover:text-zinc-500" style={{ fontFamily: 'roboto' }}>
            Home
          </Link>
          <Link
            href="/gallery"
            className="duration-200 font-medium text-zinc-950 hover:text-zinc-500"
            style={{ fontFamily: 'roboto' }}>
            Gallery
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
            <IconButton>
              <ChevronLeft />
            </IconButton>
            <IconButton>
              <ChevronRight />
            </IconButton>
          </div>
        </div>
      </div>
    </main>
  );
}
