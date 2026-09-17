# 🛍️ Shop React Full-Stack Application

A modern, full-stack e-commerce web application built with **React**, **Node.js (Express)**, and **MySQL (TiDB Cloud)**, featuring authentication powered by **Clerk**.

---

## ✨ Features

- **Product Catalog:** Browse products with real-time search and price filtering (price increases, decreases, default).
- **Product Details:** View individual product specifications (chipset, display size, camera, storage, memory).
- **Cart System:** Add items to cart with local storage persistence.
- **Admin Management Panel:** 
  - Add new products with image upload and full specification details.
  - Edit existing product data and update database records.
- **Authentication & Authorization:** Integrated with Clerk for secure user authentication and role-based access control.
- **Full-Stack Single Server Architecture:** Express backend serves both RESTful API routes and the production React build under a single domain with zero CORS issues.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, React Router v5, Axios, Clerk Auth
- **Backend:** Node.js, Express.js, MySQL2 (Connection Pool with SSL), Socket.io, Body-Parser, CORS
- **Database:** MySQL / TiDB Cloud Serverless
- **Deployment:** Render (Web Service)

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18+)
- MySQL database (local or cloud-hosted on TiDB / Aiven)

---

### 1. Clone the Repository
```bash
git clone https://github.com/agasy123/shop-react-v2.git
cd shop-react-v2
```

---

### 2. Configure Environment Variables

Create a `.env` file in the `backend/` folder:
```env
PORT=5000
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=your_mysql_user
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=node_project
```

Create a `.env` file in the `client/` folder:
```env
REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

---

### 3. Database Setup
Import the [`node_project.sql`](./node_project.sql) file into your MySQL database to create the `products` table and insert initial records.

---

### 4. Run the Development Servers

#### Backend:
```bash
cd backend
npm install
node index.js
```

#### Frontend:
```bash
cd client
npm install
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🌐 Production Deployment (Render)

This project is configured to run as a single full-stack service on Render:

- **Build Command:**
  ```bash
  cd client && npm install && npm run build && cd ../backend && npm install
  ```
- **Start Command:**
  ```bash
  node backend/index.js
  ```
- **Environment Variables on Render:**
  - `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`
  - `REACT_APP_CLERK_PUBLISHABLE_KEY`

---

## 👨‍💻 Author
**Aghasi Harutyunyan**
