import { axios_api } from "../service/request";
import { Product } from "./Product";
import { Book, DVD, Furniture } from "./ProductChildren";

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
  private products: Product[] = [];
  private constructor() {}

  public static getSingletonInstance(): ProductFactory {
    if (this.singletonInstance === null)
      this.singletonInstance = new ProductFactory();
    return this.singletonInstance;
  }

  public getProducts(): Product[] {
    if (this.products.length === 0) this.loadProducts();
    return this.products;
  }
  private async loadProducts() {
    this.products = [];
    let response = await axios_api.get("get/products.php");
    for (let product of response.data) {
      this.products.push(this.getCorrectProduct(product as RequestProps));
    }
    console.log(this.products);
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

  public deleteCheckedProducts(): number {
    let deleted = 0;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].getChecked()) {
        this.products.splice(i, 1);
        i--;
        deleted++;
      }
    }
    return deleted;
  }

  public updateProducts(){
    this.loadProducts();
  }
}
const productFactory = ProductFactory.getSingletonInstance();
export default productFactory;
