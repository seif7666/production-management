import React, { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { axios_api } from "../service/request";


type ProductProps = {
  SKU: string;
  name?: string;
  price?: number;
};
export abstract class Product extends React.Component<{},{checked:boolean}> {
  private SKU: string;
  private name: string;
  private price: number;
  private isChecked: boolean = false;

  constructor(sku: string, name: string = "", price: number = 0.0) {
    let props: ProductProps = { SKU: sku, name: name, price: price };
    super(props);
    this.SKU = sku;
    this.name = name;
    this.price = price;
    this.state= {checked:false};
    this.setState({checked:false})
    
  }
  public setSKU=(sku)=>this.SKU=sku;
  public setPrice=(price)=>this.price=price;
  public setName=(name)=>this.name=name;

  
  public getChecked = () => this.isChecked;


  public changeChecked(val) {
    console.log(val);
    this.isChecked = val;
    this.setState({ checked: val });
  }
  public abstract getInnerComponent(): JSX.Element;
  public render() {
    return (
      <div
        style={{
          border: "black solid 2px",
          borderRadius: ".5em",
          margin: "1em",
          padding: ".2em",
        }}
      >
        <input type="checkbox"  defaultChecked={this.state.checked} onChange={(e) => {
          console.log(e.target.checked)
          this.setState({checked:e.target.checked},()=>{console.log('IN HERE!')})
          this.isChecked= e.target.checked;
        }} />
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
  protected async createProductOnServer(url:string,object:Product){
    let response= await axios_api.post(url,object);
    return response;
  }
}
