import React from 'react'
import { PRODUCTS } from '../constants'
import '../css/form.css'

type SwitcherProps={
  setter
}
const TypeSwitcher = (data:SwitcherProps) => {
  return (
    <div>
      <div >
        <div style={{display:"inline"}}>
          <label>Type Switcher</label>
        </div>
        <div className='div-input' style={{display:"inline"}}>
          <select onChange={(e)=>{
            data.setter(e.target.value)
          }}>
            <option id="#Book" value={PRODUCTS.bookIndex} label="Book"/>
            <option id="#DVD" value={PRODUCTS.dvdIndex} label="DVD"/>
            <option id="#Furniture" value={PRODUCTS.furniturendex} label="Furniture"/>
          </select>
        </div>

      </div>
      
    </div>
  )
}

export default TypeSwitcher
