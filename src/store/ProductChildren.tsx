import { Product } from "./Product";
export class DVD extends Product{
    private size:number;
    
    constructor(sku:string,name:string,price:number,size:number){
        super(sku,name,price);
        this.size= size;
    }

    public setSize(size){this.size= size;}
    public getInnerComponent(): JSX.Element {
        return (
            <p>Product By DVD!</p>
        )
    }
    public createProduct(): boolean {
        throw new Error("Method not implemented.");
    }
} 
export class Book extends Product{
    private weight:number;
    
    constructor(sku:string,name:string,price:number,weight:number){
        super(sku,name,price);
        this.weight= weight;
    }
    public setWeight(weight){this.weight= weight;}
    public getInnerComponent(): JSX.Element {
        return (
            <p>Product By Book!</p>
        )
    }
    public createProduct(): boolean {
        throw new Error("Method not implemented.");
    }
} 
export class Furniture extends Product{
    private length:number;
    private width:number;
    private height:number;

    
    constructor(sku:string,name:string,price:number,length:number, width:number,height:number){
        super(sku,name,price);
        this.length= length;
        this.width= width;
        this.height= height;
    }

    public setLength(length){this.length= length;}
    public setHeight(height){this.height= height;}
    public setWidth(width){this.width= width;}

    public getInnerComponent(): JSX.Element {
        return (
            <p>Product By Furniture!</p>
        )
    }
    public createProduct(): boolean {
        throw new Error("Method not implemented.");
    }
} 