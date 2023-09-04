import './App.css';
import Home from "./components/home";
import Products from "./components/products";
import Single from "./components/single";
import Contact from "./components/contact";
import {Route} from "react-router-dom";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Admin from './components/admin';
import SingleEdit from './components/singleEdit';
import Cart from './components/cart';
import React from "react";

function App() {
  return (
    <div>
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/single/:id" component={Single} />
      <Route exact path="/singleedit/:id" component={SingleEdit} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/admin" component={Admin} />
      <Route exact path="/cart" component={Cart}></Route>
      <Footer />
    </div>
  );
}


export default App;
