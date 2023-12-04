import Link from 'next/link';
import React from 'react';

export default function Footer({ ...props }) {
  return (
    <footer className="pl-3 bg-[#a3a3a340] h-16 text-white flex flex-col justify-center items-center" {...props}>
      <a href="https://alexandre-em.fr" className="text-xs italic">
        Made by A. Em
      </a>
      <i className="font-thin text-[10px] italic">©2023 Em. All rights reserved.</i>
      <Link href="/dashboard/orders" className="font-thin text-[10px] italic text-gray-300">
        Se connecter (Admin)
      </Link>
    </footer>
  );
}
