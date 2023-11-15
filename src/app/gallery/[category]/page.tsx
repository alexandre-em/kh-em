"use client";
import {
  Breadcrumbs,
  IconButton,
  ImageList,
  ImageListItem,
  Link,
  Skeleton,
} from "@mui/material";
import React from "react";
import { categoryList } from "../constants";
import { Home } from "@mui/icons-material";
import { getDocumentByField } from "@/utils/firebase";
import { DocumentData } from "firebase/firestore";

export default function Category({ params }: { params: { category: string } }) {
  const [images, setImages] = React.useState<DocumentData[]>([]);
  React.useEffect(() => {
    if (params !== null && params !== undefined) {
      getDocumentByField("paints", "category", params.category).then((res) => {
        if (res.result) {
          setImages(res.result.docs.map((v) => ({ ...v.data(), id: v.id })));
        }
      });
    }
  }, [params]);

  return (
    <>
      <Breadcrumbs separator="›">
        <IconButton href="/">
          <Home />
        </IconButton>
        <Link
          href="/gallery"
          className="decoration-transparent text-gray-600 text-sm"
        >
          Gallery
        </Link>
        <Link
          href={`/gallery/${params.category}`}
          className="decoration-transparent text-gray-600 text-sm"
        >
          {categoryList.find(({ path }) => path === params.category)?.name}
        </Link>
      </Breadcrumbs>
      <h1 className="font-black text-2xl text-gray-800">
        {categoryList.find(({ path }) => path === params.category)?.name}
      </h1>
      {images.length > 0 ? (
        <ImageList variant="masonry" cols={3} gap={8}>
          {images.map((item) => (
            <ImageListItem key={item.url}>
              <Link href={`/gallery/${params.category}/${item.id}`}>
                <img src={item.url} alt={item.id} loading="lazy" />
              </Link>
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <div className="flex flex-wrap">
          {Array.from(Array(10).keys()).map((_, i) => (
            <Skeleton
              variant="rectangular"
              key={`skeleton-${i}`}
              width={210}
              height={118}
              className="m-3"
            />
          ))}
        </div>
      )}
    </>
  );
}
