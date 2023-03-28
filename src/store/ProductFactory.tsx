import { Product } from "./Product";
import { ProductBySize } from "./ProductChildren";

export class ProductFactory{
    private static singletonInstance:ProductFactory=new ProductFactory();
    private products:Product[]=[];
    private constructor(){}

    public static getSingletonInstance():ProductFactory{
        if(this.singletonInstance === null)
            this.singletonInstance=new ProductFactory();
        return this.singletonInstance;
    }

    public getProducts ():Product[]{
        if(this.products.length ===0)
            this.loadProducts();
        return this.products;
    }
    private loadProducts(){
        this.products=[];
        for (let i= 0;i<10;i++){
            this.products.push(new ProductBySize(i+"0000","Product "+i,150*(i+1),i));
        }
        console.log(this.products);
    }

    public deleteCheckedProducts():number{
        let deleted= 0;
        for(let i= 0 ; i<this.products.length;i++){
            if(this.products[i].getChecked()){
                this.products.splice(i,1);
                i--;
                deleted++;
            }
        }
        return deleted;
    }
}
const productFactory= ProductFactory.getSingletonInstance();
export default productFactory;