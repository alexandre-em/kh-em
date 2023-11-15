import Link from "next/link";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import { ChevronRight } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function Home() {
  return (
    <main className="flex h-full justify-center items-center">
      <div className="flex flex-row flex-wrap items-end justify-evenly">
        <img
          src="https://payload.cargocollective.com/1/19/621815/10024475/03-Femme-Girafe-60x80-2009_587.jpg"
          alt="image"
          loading="lazy"
          width="50%"
          className="shadow-2xl mb-5"
          style={{ minWidth: 250 }}
        />
        <div className="flex flex-col min-w-fit bg-white p-3 w-1/4 shadow-md mb-5">
          <b className="text-lg font-extrabold">Khindelvert Em</b>
          <i className="opacity-75 text-sm font-light mb-2">
            Femme girafe, 2009
          </i>
          <Link
            href="/"
            className="duration-200 font-medium text-zinc-950 hover:text-zinc-500"
            style={{ fontFamily: "roboto" }}
          >
            Home
          </Link>
          <Link
            href="/gallery"
            className="duration-200 font-medium text-zinc-950 hover:text-zinc-500"
            style={{ fontFamily: "roboto" }}
          >
            Gallery
          </Link>
          <Link
            href="/profile"
            className="duration-200 font-medium text-zinc-950 hover:text-zinc-500"
            style={{ fontFamily: "roboto" }}
          >
            Profile
          </Link>
          <Link
            href="/contact"
            className="duration-200 font-medium text-zinc-950 hover:text-zinc-500"
            style={{ fontFamily: "roboto" }}
          >
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
