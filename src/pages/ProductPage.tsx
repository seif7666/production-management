import React, { useEffect, useState } from "react";
import { Product } from "../store/Product";
import { Book } from "../store/ProductChildren";
import "../css/global.css";
import productFactory, { ProductFactory } from "../store/ProductFactory";
import { useNavigate } from "react-router-dom";
import { LINKS } from "../constants";
import Line from "../components/Line";

type ProductsListData = {
  products: Product[];
};
const ProductsList = (data: ProductsListData) => {
  useEffect(()=>{

  },[data.products])
  return (
    <div style={{ display: "flex", flexWrap: "wrap", margin: "3em" }}>
      {data.products.map((element: Product) => element.render())}
    </div>
  );
};
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [value, setValue] = useState(0);
  const navigate= useNavigate();

  useEffect(() => {
    console.log("RERENDERING...");
    setProducts(productFactory.getProducts());
  }, [value]);
  return (
    <div>
      <div className="titleDiv">
        <h1 >Product List</h1>
        <div
          className="buttonDiv"
        >
          <button className="N" onClick={()=>{
            navigate(LINKS.addProduct);
          }}>ADD</button>
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
        <Line/>
      </div>
      <ProductsList products={products}/>
    </div>
  );
};

export default ProductPage;
