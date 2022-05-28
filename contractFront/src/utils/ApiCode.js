import React, { createContext, useContext, useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { create} from "ipfs-http-client";
import Loading from "../components/Loading";
const ApiContext = createContext();

export const ApiCode = ({ children }) => {
  const [Category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [Products, setProducts] = useState([]);
  const [productid, setProductid] = useState();
  const [cartPage, setCartPage] = useState([]);
 



  useEffect(() => {
    getCategory();
    
  }, [Products]);

  const url = "https://fakestoreapi.com/products/categories";
  

  const getCategory = async () => {
   const response = await fetch(url);
   const data = await response.json();
   console.log(data);
   setCategory(data);
  

  };

  const getProducts = async (pathname) => {
    setIsLoading(true);
    const response = await fetch(
      `https://fakestoreapi.com/products${pathname}`
    );
    const data = await response.json();
  
    setIsLoading(false);
    setProducts(data);
  };
  const productData = async (id) => {
    setIsLoading(true);
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    setIsLoading(false);
    setProductid(data);
  };
  const onAdd = (product) => {
    const exist = cartPage.find((x) => x.id === product.id);
    if (exist) {
      setCartPage(
        cartPage.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartPage([...cartPage, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartPage.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartPage(cartPage.filter((x) => x.id !== product.id));
    } else {
      setCartPage(
        cartPage.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  return (
    <ApiContext.Provider
      value={{
        Category,
        getCategory,
        Products,
        getProducts,
        productData,
        productid,
        onAdd,
        onRemove,
        cartPage,
        setCartPage,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
export const useApiContext = () => useContext(ApiContext);
