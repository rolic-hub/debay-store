import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useApiContext } from "../utils/ApiCode";

import Body from "./Layout";
import Navbar from "./Navbar";

const Categories = () => {
  const product = useLocation();
  const { Products, getProducts } = useApiContext();

  useEffect(() => {
    getProducts(product.pathname);
    console.log(product.pathname);
  }, [product.pathname]);

  return (
    <div>
      <Navbar />
      <Body Products={Products} product={product} />
    </div>
  );
};

export default Categories;
