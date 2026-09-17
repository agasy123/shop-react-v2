const mysql = require("mysql2");
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
const sessionStorage = require("sessionstorage");
const localStorage = require("localStorage");
const dotenv = require('dotenv');
dotenv.config();
const allowedOrigins = [
  "http://localhost:3000",             // Local React development server
  "http://localhost:5000",             // Local Node/Express server
  "http://localhost:3000/",             // Local Node/Express server
  "http://localhost:5000/",             // Local Node/Express server
  process.env.CLIENT_ORIGIN,           // Live Render URL (e.g. https://your-app.onrender.com)
].filter(Boolean);


// Database connection pool (defined ONCE at the top)
const con = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "agasy",
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE || "node_project",
  port: process.env.MYSQL_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: process.env.MYSQL_HOST && process.env.MYSQL_HOST !== "localhost"
      ? { minVersion: "TLSv1.2", rejectUnauthorized: true }
      : false,// SSL for cloud DB
});

// Quick check to confirm DB connects on startup
con.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Database connected successfully!");
    connection.release(); // release back to the pool
  }
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));
app.use(
    cors({
      origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, or same-origin static requests)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error(`CORS blocked for origin: ${origin}`));
        }
      },
      credentials: true,
    })
);
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "secret",
  })
);
app.use(cookieParser("your-secret-key"));

// Routes
app.get("/data", (req, res) => {
  con.query("SELECT * FROM products", (err, result) => {
    res.send(result);
  });
});

app.get("/get_cart_items", (req, res) => {
  console.log(localStorage.cart);
  res.send(localStorage.cart);
});

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

app.post("/update", async (req, res) => {
    let products = req.body;

    if(!Array.isArray(products)) {
      products = [products];
    }

    try {
      const updatePromises=products.map((product) => {
        const query ="UPDATE products SET ? WHERE id=?";
        const values = [product, product.id];
        return con.promise().query(query, values);
      });
      await Promise.all(updatePromises);
      res.status(200).json({ success: "Updated successfully" });
    }catch (err) {
      console.error("Error updating product", err);
      res.status(500).json({ error: "Failed to update product" });
    }
});

// Access the session as req.session
app.post("/add_item_to_cart", function (req, res) {
  // sessionStorage.setItem('cart', JSON.stringify(req.body))
  // console.log(sessionStorage.getItem('cart'));
  if (localStorage.cart) {
    // console.log(sessionStorage.cart);
    localStorage.cart.push(JSON.stringify(req.body));
  } else {
    localStorage.cart = [JSON.stringify(req.body)];
    // console.log(sessionStorage.cart);
  }
  console.log(localStorage.cart);
  res.end("req.session.cart");
});


const path = require("path");

// 1. Serve the compiled React build files
app.use(express.static(path.join(__dirname, "../client/build")));

// 2. Fallback: Any GET request not matching an API route returns index.html (for React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Server Start
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
