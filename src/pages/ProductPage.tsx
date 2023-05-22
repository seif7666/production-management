import React, { useEffect, useState } from "react";
import { Product } from "../store/Product";
import { Book } from "../store/ProductChildren";
import "../css/global.css";
import productFactory, { ProductFactory } from "../store/ProductFactory";
import { useNavigate } from "react-router-dom";
import { LINKS } from "../constants";
import Line from "../components/Line";
import { observer } from "mobx-react-lite";

type ProductsListData = {
  val: number;
};
const ProductsList = observer((val:ProductsListData) => {
  const [products,setProducts]=useState([]);
  useEffect(()=>{
    const fetch=async ()=>{
      console.log('Fetching...')
      await productFactory.loadProducts();
      console.log('Fetching Done!');
      setProducts(productFactory.getProducts());
    }
    fetch();
  },[val.val])
  return (
    <div style={{ display: "flex", flexWrap: "wrap", margin: "3em" }}>
      {products.map((element: Product) => element.render())}
    </div>
  );
});
const ProductPage = observer(() => {
  const [value, setValue] = useState(0);
  const navigate= useNavigate();

  useEffect(()=>{
    console.log('ReRendered!')
  },[value])
  function useForceUpdate(){
    return () => setValue(value + 1); }
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
            onClick={async () => {
              await productFactory.deleteCheckedProducts();
              productFactory.updateProducts();
              useForceUpdate()();
            }}
          >
            MASS DELETE {value}
          </button>
        </div>
        <Line/>
      </div>
      <ProductsList val={value}/>
    </div>
  );
});

export default ProductPage;
