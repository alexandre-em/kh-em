import { Facebook, Instagram, LinkedIn, Mail } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

export default function Linksgroup({ title = true }: { title?: boolean }) {
  return (
    <>
      {title && <h1 className="flex justify-center font-black">Links</h1>}
      <div className="flex justify-center">
        <IconButton href="https://www.facebook.com/khindelvert">
          <Facebook />
        </IconButton>
        <IconButton href="https://www.instagram.com/khindelvert/">
          <Instagram />
        </IconButton>
        <IconButton href="https://www.linkedin.com/in/khindelvert-em-855557135">
          <LinkedIn />
        </IconButton>
        <IconButton href="mailto:khindelvert@hotmail.fr">
          <Mail />
        </IconButton>
      </div>
    </>
  );
}
