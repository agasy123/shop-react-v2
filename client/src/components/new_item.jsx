import "../App.css";
import React, { useState } from "react";
function New_item() {
  const [formValue, setFormvalue] = useState({
    name: "",
    description: "",
    price: 0,
    sale_price: 0,
    quantity: 0,
    image: "",
    chipset: "",
    display_size: 0,
    camera: 0,
    storage: 0,
    memory: 0,
    category: "",
    type: "",
  });
  const [message, setMessage] = useState();
  const handleInput = (e) => {
    if (e.target.name === "image") {
      let name = e.target.name;
      let value = e.target.files.item(0).name;
      setFormvalue({ ...formValue, [name]: value });
    } else {
      const { name, value } = e.target;
      setFormvalue({ ...formValue, [name]: value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const allInputValue = {
      name: formValue.name,
      description: formValue.description,
      price: formValue.price,
      sale_price: formValue.sale_price,
      quantity: formValue.quantity,
      image: formValue.image,
      chipset: formValue.chipset,
      display_size: formValue.display_size,
      camera: formValue.camera,
      storage: formValue.storage,
      memory: formValue.memory,
      category: formValue.category,
      type: formValue.type,
    };
    let res = await fetch("http://localhost:5000/new_item", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(allInputValue),
    });
    let resjson = await res.json();
    if (res.status === 200) {
      setMessage(resjson.success);
    } else {
      setMessage("Error");
    }
    console.log(message);
  };

  return (
    <div className="homediv">
        <div className="specs">
            <h1>New Item</h1>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formValue.name}
          onChange={handleInput}
        />
        <br />
        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={formValue.description}
          onChange={handleInput}
        />
        <br />
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={formValue.price}
          onChange={handleInput}
        />
        <br />
        <label>Sale price:</label>
        <input
          type="number"
          name="sale_price"
          value={formValue.sale_price}
          onChange={handleInput}
        />
        <br />
        <label>Quantity:</label>
        <input
          type="number"
          name="quantity"
          value={formValue.quantity}
          onChange={handleInput}
        />
        <br />
        <label>Image:</label>
        <img src={"../" + formValue.image} alt="not found"></img>
        <input type="file" name="image" onChange={handleInput} />
        <br />
        <label>Chipset:</label>
        <input
          type="text"
          name="chipset"
          value={formValue.chipset}
          onChange={handleInput}
        />
        <br />
        <label>Display Size:</label>
        <input
          type="number"
          name="display_size"
          value={formValue.display_size}
          onChange={handleInput}
        />
        <br />
        <label>Camera:</label>
        <input
          type="number"
          name="camera"
          value={formValue.camera}
          onChange={handleInput}
        />
        <br />
        <label>Storage:</label>
        <input
          type="number"
          name="storage"
          value={formValue.storage}
          onChange={handleInput}
        />
        <br />
        <label>Memory:</label>
        <input
          type="number"
          name="memory"
          value={formValue.memory}
          onChange={handleInput}
        />
        <br />
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={formValue.category}
          onChange={handleInput}
        />
        <br />
        <label>Type:</label>
        <input
          type="text"
          name="type"
          value={formValue.type}
          onChange={handleInput}
        />
        <br />
        <a href="#" onClick={handleSubmit}>Send New item</a>
        </div>
    </div>
  );
}

export default New_item;
