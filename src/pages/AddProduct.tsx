import React, { useEffect, useState } from "react";
import Form from "../components/Form";
import Line from "../components/Line";
import {
  BookComponent,
  DVDComponent,
  FurnitureComponent,
  ProductProps,
} from "../components/Products";
import TypeSwitcher from "../components/TypeSwitcher";
import { PRODUCTS } from "../constants";
import "../css/global.css";
import { Product } from "../store/Product";
const AddProduct = () => {
  const [product, setProduct] = useState<Product>(null);
  return (
    <div>
      <div className="titleDiv">
        <h1>Product Add</h1>
        <div className="buttonDiv">
          <button className="N" onClick={()=>{product.createProduct()}}>Save</button>
          <button className="N">Cancel</button>
        </div>
        <Line />
      </div>
      <ProductForm product={product} setter={setProduct} />
    </div>
  );
};

const ProductForm = (data: ProductProps) => {
  const [sku, setSKU] = useState("#sku");
  const [name, setName] = useState("#name");
  const [price, setPrice] = useState("#price");

  const components = new Array(PRODUCTS.numberOfProducts);
  components[PRODUCTS.bookIndex] = () => (
    <BookComponent product={data.product} setter={data.setter} />
  );
  components[PRODUCTS.dvdIndex] = () => (
    <DVDComponent product={data.product} setter={data.setter} />
  );
  components[PRODUCTS.furniturendex] = () => (
    <FurnitureComponent product={data.product} setter={data.setter} />
  );

  const [selectedIndex, setSelectedIndex] = useState(PRODUCTS.bookIndex);

  useEffect(()=>{
    if(data.product ===null)
      return;
    data.product.setSKU(sku);
    data.product.setName(name);
    data.product.setPrice(price);
    console.log(data.product)
  },[sku,name,price,data.product])

  return (
    <div style={{ margin: "2em" }}>
      <form id="#product_form">
        <Form name={"SKU"} idName="#sku" setter={setSKU} />
        <Form name={"Name"} idName="#name" setter={setName} />
        <Form name={"Price ($)"} idName="#price" setter={setPrice} />
        <TypeSwitcher setter={setSelectedIndex} />
        <div
          style={{
            margin: "2em 0 2em 0",
            padding: "1em",
            border: "black solid 2px",
            borderRadius: 5,
            width: "60%",
          }}
        >
          {components[selectedIndex]()}
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
