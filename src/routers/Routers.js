// router
import { Routes, Route } from "react-router-dom";

// pages
import {
  Home,
  Cart,
  Checkout,
  Login,
  ProductDetails,
  Shop,
  Signup,
} from "../pages/index";

export const Routers = () => {
  return (
    <Routes>
      <Route path="home" element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="shop/:id" element={<ProductDetails />} />
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Routes>
  );
};
