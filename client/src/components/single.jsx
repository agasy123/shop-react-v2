import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";



export default function Single() {
  const [data, setData] = useState();
  const storedItems=localStorage.getItem("cart");

  const [cartItems, setCartItems] = useState(storedItems);

  useEffect(()=>{
    localStorage.setItem("cart", JSON.stringify(cartItems));
    console.log(storedItems);
  }, [cartItems])

  const apiGet = () => {
    fetch("/data")
      .then((resp) => resp.json())
      .then((resp) => {
        setData(resp);
      });
  };
  useEffect(() => {
    apiGet();
  }, []);



  // async function addItemToCart(item, quantity) {
  //   await fetch("/add_item_to_cart", {
  //     method: "POST",
  //     headers: { "content-type": "application/json" },
  //     body: JSON.stringify(item),
  //   });
  // }
  function addItemToCart(item, quantity) {
    if (cartItems) {
      setCartItems(cartItems=> [...cartItems, JSON.stringify(item.name)])
    }else{
      setCartItems(JSON.stringify(item.name));
    }
  }
  const routeParams = useParams();
  const path = "../";
  return (
    <div>
      {data?.map((item) => {
        if (item.id == routeParams.id) {
          return (
            <article className="singleArticle" key={item.id}>
              <h1 style={{ marginBottom: "70px" }}>{item.name}</h1>
              <div className="singlePage">
                <div>
                  <img src={path + item.image} alt="not found"></img>
                </div>
                <div className="singleDescp">
                  <h3>{item.description}</h3>
                  <button id="addToCart" onClick={()=>{addItemToCart(item,document.getElementById("quantity").value)}}>
                    Add to Cart
                  </button>
                  <input type="number" name="quantity" id="quantity" />
                </div>
                <div className="specs">
                  <h1>Specifications</h1>
                  <span className="specs_span">Chipset:</span>
                  <span>{item.chipset}</span>
                  <br></br>
                  <span className="specs_span">Display Size:</span>
                  <span>{item.display_size}"</span>
                  <br></br>
                  <span className="specs_span">Camera:</span>
                  <span>{item.camera} Mp</span>
                  <br></br>
                  <span className="specs_span">Storage:</span>
                  <span>{item.storage} Gb</span>
                  <br></br>
                  <span className="specs_span">Memory:</span>
                  <span>{item.memory} Gb</span>
                  <br></br>
                </div>
              </div>
            </article>
          );
        }
      })}
    </div>
  );
}
