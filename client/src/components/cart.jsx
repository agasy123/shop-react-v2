import axios from "axios";
import React, { useState, useEffect } from "react";
import { useTranslation } from "../context/LanguageContext";

function Cart() {
  const { t } = useTranslation();
  const [cartItems, setCartItems] = useState();

  const apiGet = () => {
    axios
      .get("/get_cart_items")
      .then((res) => setCartItems(res.cartItems))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    apiGet();
  }, []);

  return (
    <div>
      {!cartItems || cartItems.length === 0 ? (
        <h1>{t("cart.empty")}</h1>
      ) : null}
      {cartItems?.map((item) => {
        return (
          <div key={item.id}>
            <img src={item.image} alt="not found"></img>
            <h1>{item.name}</h1>
          </div>
        );
      })}
    </div>
  );
}

export default Cart;
