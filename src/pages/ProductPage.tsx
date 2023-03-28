import React, { useEffect, useState } from "react";
import { Product } from "../store/Product";
import { ProductBySize } from "../store/ProductChildren";
import "../css/global.css";
import productFactory, { ProductFactory } from "../store/ProductFactory";

type ProductsListData = {
  products: Product[];
};
const ProductsList = (data: ProductsListData) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", margin: "3em" }}>
      {data.products.map((element: Product) => element.render())}
    </div>
  );
};
const ProductPage = () => {
  const [products, setProducts] = useState(productFactory.getProducts());
  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log("RERENDERING...");
    setProducts(productFactory.getProducts());
  }, [value]);
  return (
    <div>
      <div style={{ height: "15vh", position: "relative", margin: "2em" }}>
        <h1 style={{ display: "inline-block" }}>Product List</h1>
        <div
          style={{
            float: "right",
            display: "inline-block",
            position: "relative",
            top: "30%",
            bottom: "30%",
          }}
        >
          <button className="N">ADD</button>
          <button
            className="N"
            onClick={() => {
              productFactory.deleteCheckedProducts();
              setValue(value + 1);
            }}
          >
            MASS DELETE
          </button>
        </div>
        <div
          style={{ width: "100%", backgroundColor: "black", height: ".8vh" }}
        />
      </div>
      <ProductsList products={products}/>
    </div>
  );
};

export default ProductPage;
