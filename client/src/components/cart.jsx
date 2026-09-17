import axios from "axios";
import React from "react"
import { useState, useEffect } from "react"

function Cart() {
  const [cartItems, setCartItems]=useState();
  const apiGet=()=>{
    axios.get("/get_cart_items")
    .then(cartItems=>setCartItems(cartItems.cartItems))
    .catch(error =>console.log(error))
  }
  useEffect(()=>{
    apiGet();
    //console.log(cartItems);
  },[])
  return(
    <div>
      {!cartItems || cartItems.length===0 ? (
          <h1>There is no Car items now</h1>
      ): null}
      {
        cartItems?.map((item)=>{
          return <div key={item.id}>
            <img src={item.image} alt="not found"></img>
            <h1>{item.name}</h1>
          </div>
        })
      }
    </div>
  )

  
}

export default Cart