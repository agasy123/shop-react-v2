import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function EditItems() {
  const [dbData, setData] = useState();
  const apiGet = () => {
    fetch("http://agasy.shop:5000/data")
      .then((resp) => resp.json())
      .then((resp) => {
        // console.log(resp);
        setData(resp);
      });
  };
  useEffect(() => {
    apiGet();
  }, []);

  function check_price(x, y) {
    if (x && x != 0) {
      return (
        <div>
          <h2>{x} $</h2>
          <h2 id="old-price">{y} $</h2>
        </div>
      );
    } else {
      return <h2>{y} $</h2>;
    }
  }

  return (
    <div id="prod" className="prodPage">
      {dbData?.map((item) => {
        return (
          <article className="product" key={item.id}>
            <h1>{item.name}</h1>
            <div className="product">
              <img src={item.image} alt="not found"></img>
              {check_price(item.sale_price, item.price)}
              <Link to={`/singleEdit/${item.id}`}>Show More</Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default EditItems;
