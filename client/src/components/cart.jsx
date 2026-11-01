import axios from "axios";
import React, { useState, useEffect } from "react";
import { useTranslation } from "../context/LanguageContext";

function Cart() {
  const { t } = useTranslation();
  const [cartItems, setCartItems] = useState();
  const [loading, setLoading] = useState(true);

  const apiGet = () => {
    setLoading(true);
    axios
      .get("/get_cart_items")
      .then((res) => {
        setCartItems(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    apiGet();
  }, []);

  const removeItem = (itemId) => {
    axios
      .delete(`/remove_cart_item/${itemId}`)
      .then(() => {
        apiGet();
      })
      .catch((error) => console.log(error));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    axios
      .put(`/update_cart_item/${itemId}`, { quantity: newQuantity })
      .then(() => {
        apiGet();
      })
      .catch((error) => console.log(error));
  };

  const calculateTotal = () => {
    if (!cartItems) return 0;
    return cartItems.reduce((total, item) => {
      const price = item.sale_price || item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <div className="main">
      {loading ? (
        <div className="loading-skeleton">
          <div className="skeleton-cart"></div>
          <div className="skeleton-cart"></div>
        </div>
      ) : !cartItems || cartItems.length === 0 ? (
        <h1>{t("cart.empty")}</h1>
      ) : (
        <div>
          <h1>{t("cart.title")}</h1>
          {cartItems.map((item) => {
            const price = item.sale_price || item.price;
            return (
              <div key={item.id} className="cart-item">
                <img src={`../${item.image}`} alt={item.name} width="100" height="100"></img>
                <div className="cart-item-details">
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                  <p className="price">${price.toFixed(2)}</p>
                  <div className="cart-item-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                    <button 
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      {t("cart.remove")}
                    </button>
                  </div>
                  <p className="item-total">{t("cart.total")}: ${(price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            );
          })}
          <div className="cart-summary">
            <h2>{t("cart.total")}: ${calculateTotal().toFixed(2)}</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
