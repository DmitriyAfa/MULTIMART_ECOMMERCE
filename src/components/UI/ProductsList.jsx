import React from "react";

// components
import { ProductCard } from "./ProductCard";

export const ProductsList = ({ data }) => {
  return (
    <>
      {data?.map((item, i) => {
        return <ProductCard item={item} key={item + `${i}`} />;
      })}
    </>
  );
};
