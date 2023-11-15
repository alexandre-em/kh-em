"use client";
import { getDocument } from "@/utils/firebase";
import { Breadcrumbs, Button, IconButton, Link } from "@mui/material";
import React, { useMemo } from "react";
import { categoryList } from "../../constants";
import { Comment, Home } from "@mui/icons-material";
import { useStore } from "@/providers/useStore";

export default function PaintDetail({ params }: { params: { id: string } }) {
  const [image, setImage] = React.useState<Record<string, string>>();
  const storeContext = useStore();

  const isProductInBasket = useMemo(
    () =>
      image &&
      storeContext &&
      storeContext.cart.find((article) => article.item.id === image.id),
    [storeContext, image]
  );
  const handleUpdateBasket = React.useCallback(() => {
    if (image) {
      if (!isProductInBasket) {
        console.log("Adding product in basket", image);
        storeContext!.dispatch("ADD_ITEM_CART", { item: image, quantity: 1 });
      } else {
        if (storeContext && image) {
          console.log("Removing product from basket");
          storeContext!.dispatch("REMOVE_ITEM_CART", {
            item: image,
          });
        }
      }
    }
  }, [image, storeContext, isProductInBasket]);

  React.useEffect(() => {
    if (params.id) {
      getDocument("paints", params.id).then((res) => {
        if (res.result) {
          setImage({
            ...res.result.data(),
            id: params.id,
          });
        }
      });
    }
  }, [params.id]);

  console.log(storeContext);

  if (!image) return null;

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
          href={`/gallery/${image.category}`}
          className="decoration-transparent text-gray-600 text-sm"
        >
          {categoryList.find(({ path }) => path === image.category)?.name}
        </Link>
        <Link
          href={`/gallery/${image.category}/${image.id}`}
          className="decoration-transparent text-gray-600 text-sm"
        >
          {image.title}
        </Link>
      </Breadcrumbs>
      <div className="flex flex-wrap sm:justify-between justify-center bg-white rounded-xl">
        <img
          alt="image"
          src={image.url}
          className="w-8/12 h-fit max-w-xl min-w-[300px] sm:rounded-xl rounded-none"
        />
        <div className="p-2 flex flex-col justify-between w-full sm:w-fit">
          <div className="">
            <h1 className="font-extrabold text-2xl">{image.title}</h1>
            <b>{image.year}</b>
            <p className="mb-5">
              Dimensions: {image.width} × {image.height} cm
            </p>
            <b>Price: {image.price}€</b>
            <p>Available quantity: {image.stock}</p>
          </div>
          <div className="flex justify-between">
            <IconButton>
              <Comment />
            </IconButton>
            <Button variant="outlined" onClick={handleUpdateBasket}>
              Add basket
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
