import React from 'react'
import { Product } from '../store/Product'
import { ProductBySize } from '../store/ProductChildren'
import "../css/global.css"
const ProductPage = () => {
    let products= []
    for (let i= 0;i< 20;i++)
        products.push(new ProductBySize("SKU","Seif",10,100));
  return (
    <div>
        <div style={{height:"15vh", position:"relative", margin:"2em"}}>
            <h1 style={{display:"inline-block"}}>
                Product List</h1>
            <div style={{float:"right", display:"inline-block", position:"relative",top:"30%",bottom:"30%"}}>
                <button className='N'>ADD</button>
                <button className='N'>MASS DELETE</button>
            </div>
        <div style={{width:"100%", backgroundColor:"black", height:".8vh"}}/>
        </div>
        <div style={{display:"flex" ,flexWrap: "wrap", margin:"3em"}}>
            {
                products.map((element:Product)=>element.render())
            }
        </div>
    </div>
  )
}

export default ProductPage
