import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApiContext } from "../utils/ApiCode";
import Footers from "./Footer";
import { Rate } from "antd";
import Navbar from "./Navbar";
import "./product.css";
import { useIntegraContext } from "../utils/integration";

const Product = () => {
  const { id } = useParams();

  const { dataFeed, isAuthenticated, Price } = useIntegraContext();
  const { productData, productid, onAdd } = useApiContext();

  useEffect(() => {
    productData(id);
  }, [id]);

  return (
    <div>
      <Navbar />
      <div>
        <div className="product">
          <div>
            <img
              className="product-image"
              src={productid?.image}
              alt={productid?.title}
              height="300px"
              width="300px"
            />
          </div>
          <div className="product-details">
            <h2>{productid?.title}</h2>
            <Rate disabled defaultValue={productid?.rating.rate} />
            {!isAuthenticated ? (
              <p style={{ marginTop: "15px"}}>
                {" "}
                Price:
                <span style={{ color: "green" }}>${productid?.price}</span>
              </p>
            ) : (
              Price((productid?.price / dataFeed).toFixed(3), "Price")
            )}
            <hr style={{marginTop:"5px"}}></hr>
            {productid?.rating.count > 0 ? (
              <h4 style={{ color: "blue" }}>In Stock</h4>
            ) : (
              <h4 style={{ color: "red" }}>Out of Stock</h4>
            )}
            <button
              className="cart-button"
              style={{
                cursor: "pointer",
                backgroundColor: "orange",
                border: "none",
                color: "white",
                marginBottom:"10px",
                marginTop:"5px"
              }}
              onClick={() => onAdd(productid)}
            >
              Add To Cart +
            </button>
            <hr></hr>

            <h3>Product Description</h3>
            <p>{productid?.description}</p>
          </div>
        </div>
        <footer>
          <Footers />
        </footer>
      </div>
    </div>
  );
};

export default Product;
