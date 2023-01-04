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

export const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/home"} />} />
      <Route path="home" element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="shop/:id" element={<ProductDetails />} />
      <Route path="cart" element={<Cart />} />
      <Route
        path="checkout"
        element={
          <ProtectedRouter>
            <Checkout />
          </ProtectedRouter>
        }
      />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Routes>
  );
};
