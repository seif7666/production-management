import React, { useEffect, useState } from "react";
import "../css/form.css";
import { Product } from "../store/Product";
import { Book, DVD, Furniture } from "../store/ProductChildren";
import Form from "./Form";
export type ProductProps = {
  product: Product;
  setter;
};
export const BookComponent = (data: ProductProps): JSX.Element => {
  let product = new Book("", "", 0, 0);
  const [weight,setWeight]= useState("0");
  useEffect(()=>{
    product.setWeight(weight);
    data.setter(product);
  },[weight])
  return (
    <div style={{ height: "15vh", paddingTop: "10%" }}>
      <div style={{ display: "inline", marginRight: "1em" }}>
        <label>Weight(KG)</label>
      </div>
      <div style={{ display: "inline" }}>
        <input id="weight" type={"number"} onChange={(e)=>{setWeight(e.target.value)}}/>
      </div>
    </div>
  );
};
export const DVDComponent = (data: ProductProps): JSX.Element => {
  let product = new DVD("", "", 0, 0);
  const [size, setSize] = useState("0");
  useEffect(() => {
    product.setSize(size);
    data.setter(product);
  }, [size]);
  return (
    <div style={{ height: "15vh", paddingTop: "10%" }}>
      <div style={{ display: "inline", marginRight: "1em" }}>
        <label>Size(MB)</label>
      </div>
      <div style={{ display: "inline" }}>
        <input
          id="size"
          type={"number"}
          onChange={(e) => {
            setSize(e.target.value)
          }}
        />
      </div>
    </div>
  );
};
export const FurnitureComponent = (data: ProductProps): JSX.Element => {
  const [height, setHeight] = useState("0");
  const [width, setWidth] = useState("0");
  const [length, setLength] = useState("0");
  let product = new Furniture("", "", 0, 0, 0, 0);
  useEffect(() => {
    product.setHeight(height);
    product.setWidth(width);
    product.setLength(length);
    data.setter(product);
  }, [height, width, length]);
  return (
    <>
      <Form name="Height (CM)" setter={setHeight} idName="height" />
      <Form name="Width (CM)" setter={setWidth} idName="width" />
      <Form name="Length (CM)" setter={setLength} idName="length" />
    </>
  );
};
