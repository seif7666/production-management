import { axios_api } from "../service/request";
import { Product } from "./Product";
import { Book, DVD, Furniture } from "./ProductChildren";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";

type ProductProps = {
  SKU: string;
  name: string;
  price: number;
};
type RequestProps = {
  size?: number;
  weight?: number;
  width?: number;
  length?: number;
  height?: number;
  product: ProductProps;
};
export class ProductFactory {
  private static singletonInstance: ProductFactory = new ProductFactory();
  private products: Product[] = undefined;
  private constructor() {
    makeAutoObservable(this);
  }

  public static getSingletonInstance(): ProductFactory {
    if (this.singletonInstance === null)
      this.singletonInstance = new ProductFactory();
    return this.singletonInstance;
  }

  public getProducts(): Product[] {
    return this.products;
  }
  public async loadProducts() {
    console.log('Called!');
    if (typeof(this.products)!== "undefined") return;
    this.products = [];
    console.log("Waiting...");
    let response = await axios_api.get("get/products.php");
    for (let product of response.data) {
      this.products.push(this.getCorrectProduct(product as RequestProps));
    }
    console.log('Terminated!');

  }
  private getCorrectProduct(product: RequestProps): Product {
    if (product.hasOwnProperty("size")) {
      return new DVD(
        product.product.SKU,
        product.product.name,
        product.product.price,
        product.size
      );
    }
    if (product.hasOwnProperty("weight")) {
      return new Book(
        product.product.SKU,
        product.product.name,
        product.product.price,
        product.weight
      );
    } //Furniture
    else
      return new Furniture(
        product.product.SKU,
        product.product.name,
        product.product.price,
        product.length,
        product.weight,
        product.height
      );
  }

  public deleteCheckedProducts() {
    let deletedIDs = [];
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].getChecked()) {
        deletedIDs.push(this.products[i].getSKU());
      }
    }
    return axios_api.post('delete/products.php',{Ids:deletedIDs});
  }

  public updateProducts() {
    this.products = undefined;
  }
}
const productFactory = ProductFactory.getSingletonInstance();
export default productFactory;
