import { Product } from "./Product";
export class ProductBySize extends Product{
    private size:number;
    
    constructor(sku:string,name:string,price:number,size:number){
        super(sku,name,price);
        this.size= size;
    }
    public getInnerComponent(): JSX.Element {
        return (
            <p>Product By Size!</p>
        )
    }
    public createProduct(): boolean {
        throw new Error("Method not implemented.");
    }
    
} 