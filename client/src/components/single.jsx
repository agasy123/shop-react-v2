import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "../context/LanguageContext";

export default function Single() {
  const { t } = useTranslation();
  const [data, setData] = useState();
  const storedItems = localStorage.getItem("cart");

  const [cartItems, setCartItems] = useState(storedItems);

  useEffect(() => {
    if (cartItems) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

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

  function addItemToCart(item, quantity) {
    if (cartItems) {
      setCartItems((cartItems) => [...cartItems, JSON.stringify(item.name)]);
    } else {
      setCartItems(JSON.stringify(item.name));
    }
  }

  const routeParams = useParams();
  const path = "../";

  return (
    <div>
      {!data ? (
        <div className="singleArticle">
          <div className="loading-skeleton">
            <div className="skeleton-title"></div>
            <div className="skeleton-content"></div>
          </div>
        </div>
      ) : data
        ?.filter((item) => String(item.name) === String(routeParams.name))
        .map((item) => {
          return (
            <article className="singleArticle" key={item.id}>
              <h1 style={{ marginBottom: "70px" }}>{item.name}</h1>
              <div className="singlePage">
                <div>
                  <img src={path + item.image} alt="not found" width="400" height="400"></img>
                </div>
                <div className="singleDescp">
                  <h3>{item.description}</h3>
                  <button
                    id="addToCart"
                    onClick={() => {
                      addItemToCart(
                        item,
                        document.getElementById("quantity").value
                      );
                    }}
                  >
                    {t("single.addToCart")}
                  </button>
                  <input type="number" name="quantity" id="quantity" />
                </div>
                <div className="specs">
                  <h1>{t("single.specifications")}</h1>
                  <span className="specs_span">{t("single.chipset")}</span>
                  <span>{item.chipset}</span>
                  <br></br>
                  <span className="specs_span">{t("single.displaySize")}</span>
                  <span>{item.display_size}"</span>
                  <br></br>
                  <span className="specs_span">{t("single.camera")}</span>
                  <span>{item.camera} Mp</span>
                  <br></br>
                  <span className="specs_span">{t("single.storage")}</span>
                  <span>{item.storage} Gb</span>
                  <br></br>
                  <span className="specs_span">{t("single.memory")}</span>
                  <span>{item.memory} Gb</span>
                  <br></br>
                </div>
              </div>
            </article>
          );
        })}
    </div>
  );
}
