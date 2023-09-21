const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const fs = require("fs");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const socketIOSession = require("socket.io-express-session");
const sessionStorage=require("sessionstorage")
const localStorage=require("localStorage")

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "PfN8KqAUtrdzuIAHBgBn",
  database: "node_project",
});

con.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));
app.use(
  cors({
    origin: "http://localhost:3000", // react app location
    credentials: true,
  })
);
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "secret",
}));
app.use(cookieParser("your-secret-key"));



// Routes
app.get("/data", (req, res) => {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "node_project",
  });
  con.query("SELECT * FROM products", (err, result) => {
    res.send(result);
  });
});

app.get("/get_cart_items",(req,res)=>{
  console.log(localStorage.cart);
  res.send(localStorage.cart)
})

app.post("/new_item", (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const image = req.body.image;
  const chipset = req.body.chipset;
  const display_size = req.body.display_size;
  const camera = req.body.camera;
  const storage = req.body.storage;
  const memory = req.body.memory;
  const price = req.body.price;
  const sale_price = req.body.sale_price;
  const quantity = req.body.quantity;
  const category = req.body.category;
  const type = req.body.type;
  console.log(
    name,
    description,
    image,
    chipset,
    display_size,
    camera,
    storage,
    memory,
    price,
    sale_price,
    quantity,
    category,
    type
  );
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "node_project",
  });
  var query =
    "INSERT INTO products (name, description, image, chipset, display_size, camera, storage, memory, price, sale_price, quantity, category, type) VALUES ?";
  var values = [
    [
      name,
      description,
      image,
      chipset,
      display_size,
      camera,
      storage,
      memory,
      price,
      sale_price,
      quantity,
      category,
      type,
    ],
  ];
  con.query(query, [values], (err, result) => {
    if (!err) {
      res.status(200).json({ success: "New Item Added" });
    } else {
      console.log(err);
    }
  });
});

app.post("/update", (req, res) => {
  con.query("", (err, result) => {
    let products = req.body;
    for (let i = 0; i < products.length; i++) {
      var query = "UPDATE products SET ? WHERE id=?";
      var values = [products[i], products[i].id];
      con.query(query, values, (err, result) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.send("Updated Succsesfully");
        }
      });
    }
  });
});

// Access the session as req.session
app.post('/add_item_to_cart', function(req, res) {
  // sessionStorage.setItem('cart', JSON.stringify(req.body))
  // console.log(sessionStorage.getItem('cart'));
  if (localStorage.cart) {
    // console.log(sessionStorage.cart);
    localStorage.cart.push(JSON.stringify(req.body))
  } else {
    localStorage.cart=[JSON.stringify(req.body)]
    // console.log(sessionStorage.cart);
  }
  console.log(localStorage.cart);
  res.end("req.session.cart")
})

// Server Start
server.listen(5000, () => {
  console.log("Server has started");
});