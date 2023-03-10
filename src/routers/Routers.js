import React from "react";
// router
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRouter } from "./ProtectedRouter";

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

// admin
import { AddProduct, AllProducts, Dashboard, Users } from "../admin/index";

export const Routers = React.memo(() => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/home"} />} />
      <Route path="home" element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="shop/:id" element={<ProductDetails />} />
      <Route path="cart" element={<Cart />} />

      <Route path="/*" element={<ProtectedRouter />}>
        <Route path="checkout" element={<Checkout />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/all-products" element={<AllProducts />} />
        <Route path="dashboard/add-product" element={<AddProduct />} />
        <Route path="dashboard/users" element={<Users />} />
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Routes>
  );
});
