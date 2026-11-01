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

// Get or create cart for session/user
const getOrCreateCart = (req) => {
  return new Promise((resolve, reject) => {
    const sessionId = req.sessionID;
    const userId = req.session.userId || null;

    // Try to find existing cart
    const query = userId 
      ? 'SELECT * FROM carts WHERE user_id = ? ORDER BY id DESC LIMIT 1'
      : 'SELECT * FROM carts WHERE session_id = ? ORDER BY id DESC LIMIT 1';
    const params = userId ? [userId] : [sessionId];

    con.query(query, params, (err, results) => {
      if (err) return reject(err);

      if (results.length > 0) {
        resolve(results[0]);
      } else {
        // Create new cart
        const insertQuery = 'INSERT INTO carts (user_id, session_id) VALUES (?, ?)';
        con.query(insertQuery, [userId, sessionId], (err, result) => {
          if (err) return reject(err);
          resolve({ id: result.insertId, user_id: userId, session_id: sessionId });
        });
      }
    });
  });
};

app.get("/get_cart_items", async (req, res) => {
  try {
    const cart = await getOrCreateCart(req);
    
    const query = `
      SELECT ci.*, p.name, p.description, p.image, p.price, p.sale_price, p.quantity as stock
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.cart_id = ?
    `;
    
    con.query(query, [cart.id], (err, results) => {
      if (err) {
        console.error("Error fetching cart items:", err);
        return res.status(500).json({ error: "Failed to fetch cart items" });
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Error in get_cart_items:", error);
    res.status(500).json({ error: "Server error" });
  }
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

// Add item to cart
app.post("/add_item_to_cart", async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    
    if (!product_id || !quantity) {
      return res.status(400).json({ error: "product_id and quantity are required" });
    }

    const cart = await getOrCreateCart(req);

    // Check if item already exists in cart
    const checkQuery = 'SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?';
    con.query(checkQuery, [cart.id, product_id], (err, results) => {
      if (err) {
        console.error("Error checking cart item:", err);
        return res.status(500).json({ error: "Failed to check cart item" });
      }

      if (results.length > 0) {
        // Update quantity if item exists
        const updateQuery = 'UPDATE cart_items SET quantity = quantity + ? WHERE id = ?';
        con.query(updateQuery, [quantity, results[0].id], (err) => {
          if (err) {
            console.error("Error updating cart item:", err);
            return res.status(500).json({ error: "Failed to update cart item" });
          }
          res.json({ success: true, message: "Cart item updated" });
        });
      } else {
        // Insert new item if it doesn't exist
        const insertQuery = 'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)';
        con.query(insertQuery, [cart.id, product_id, quantity], (err) => {
          if (err) {
            console.error("Error adding cart item:", err);
            return res.status(500).json({ error: "Failed to add cart item" });
          }
          res.json({ success: true, message: "Item added to cart" });
        });
      }
    });
  } catch (error) {
    console.error("Error in add_item_to_cart:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Remove item from cart
app.delete("/remove_cart_item/:id", async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const query = 'DELETE FROM cart_items WHERE id = ?';
    
    con.query(query, [cartItemId], (err, result) => {
      if (err) {
        console.error("Error removing cart item:", err);
        return res.status(500).json({ error: "Failed to remove cart item" });
      }
      res.json({ success: true, message: "Item removed from cart" });
    });
  } catch (error) {
    console.error("Error in remove_cart_item:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update cart item quantity
app.put("/update_cart_item/:id", async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const { quantity } = req.body;
    
    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: "Valid quantity is required" });
    }

    const query = 'UPDATE cart_items SET quantity = ? WHERE id = ?';
    con.query(query, [quantity, cartItemId], (err, result) => {
      if (err) {
        console.error("Error updating cart item quantity:", err);
        return res.status(500).json({ error: "Failed to update cart item quantity" });
      }
      res.json({ success: true, message: "Cart item quantity updated" });
    });
  } catch (error) {
    console.error("Error in update_cart_item:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Dynamic Sitemap for SEO
app.get("/sitemap.xml", (req, res) => {
  const baseUrl = (process.env.CLIENT_ORIGIN || "https://shop-react-v2.onrender.com").replace(/\/$/, "");

  con.query("SELECT id FROM products", (err, products) => {
    if (err) {
      console.error("Error generating sitemap:", err);
      return res.status(500).end();
    }

    const staticUrls = [
      { loc: `${baseUrl}/`, priority: "1.0", changefreq: "daily" },
      { loc: `${baseUrl}/products`, priority: "0.9", changefreq: "daily" },
      { loc: `${baseUrl}/contact`, priority: "0.7", changefreq: "monthly" },
    ];

    const dynamicUrls = (products || []).map((product) => ({
      loc: `${baseUrl}/single/${product.id}`,
      priority: "0.8",
      changefreq: "weekly",
    }));

    const allUrls = [...staticUrls, ...dynamicUrls];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.status(200).send(xml);
  });
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
