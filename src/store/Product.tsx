import React from "react";

type ProductProps = {
  SKU: string;
  name?: string;
  price?: number;
};
export abstract class Product extends React.Component {
  private SKU: string;
  private name: string;
  private price: number;

  constructor(sku: string, name: string = "", price: number = 0.0) {
    let props: ProductProps = { SKU: sku, name: name, price: price };
    super(props);
    this.SKU = sku;
    this.name = name;
    this.price = price;
  }

  public abstract getInnerComponent(): JSX.Element;
  public render() {
    return (
      <div
        style={{
          border: "black solid 2px",
          borderRadius:".5em",
          margin: "1em",
          padding:".2em"
        }}
      >
        <div>
        <input type = "checkbox"/> 
        </div>
        <div style={{ padding: ".2em 2em .2em 2em", textAlign: "center" }}>
          {this.SKU}
          <br />
          {this.name}
          <br />
          {this.price}
          <br />

          {this.getInnerComponent()}
        </div>
      </div>
    );
  }
  public abstract createProduct(): boolean;
}
