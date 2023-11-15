import { Button, ImageList, ImageListItem, Link } from "@mui/material";
import React from "react";

import { categoryList } from "./constants";

export function CategoryPreview({
  category,
}: {
  category: (typeof categoryList)[0];
}) {
  return (
    <div className="self-center mb-2">
      <div className="flex justify-between">
        <h2 className="font-bold text-gray-700 text-xl">{category.name}</h2>
        <Button href={`/gallery/${category.path}`}>See more..</Button>
      </div>
      <ImageList sx={{ width: 499 }} cols={3} rowHeight={164}>
        {category.images.map((item) => (
          <ImageListItem key={item.id}>
            <Link href={`/gallery/${category.path}/${item.id}`}>
              <img src={item.url} alt="pic" loading="lazy" />
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
      <h1 className="font-black text-2xl text-gray-800">Gallery</h1>
      <i className="font-thin text-sm text-gray-500">
        Here is all of my works with their informations. If you are interested
        in buying one (or more) of them, please send me an email with the(ir)
        link(s) to check their availabilities.
      </i>
      <div className="flex flex-col justify-center h-full">
        {categoryList.map((category) => (
          <CategoryPreview key={category.name} category={category} />
        ))}
      </div>
    </>
  );
}
