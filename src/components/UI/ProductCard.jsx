import React from "react";

// styles
import "../../styles/product-card.css";

// reactstrap
import { Col } from "reactstrap";

// animation
import { motion } from "framer-motion";

// react-toastify - красивые уведомления
import { toast } from "react-toastify";

// router
import { Link } from "react-router-dom";

// redux
import { useDispatch } from "react-redux";
import { addCartItem } from "../../services/redux/slices/cartSlice";

export const ProductCard = ({ item }) => {
  const dipsatch = useDispatch();
  const { imgUrl, productName, price, category, id } = item;

  const addToCart = () => {
    dipsatch(
      addCartItem({
        id: id,
        productName: productName,
        imgUrl: imgUrl,
        price: price,
        quantity: 1,
        totalPrice: price,
      })
    );

    toast.success("Product added successfully");
  };
  return (
    <Col lg="3" md="4" className="mb-2">
      <div className="product__item">
        <div className="product__img">
          <motion.img whileHover={{ scale: 0.9 }} src={imgUrl} alt="card" />
        </div>
        <div className="p-2 product__info">
          <h3 className="product__name">
            <Link to={`/shop/${id}`}>{productName}</Link>
          </h3>
          <span>{category}</span>
        </div>
        <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
          <span className="price">${price}</span>
          <motion.span whileTap={{ scale: 1.2 }} onClick={addToCart}>
            <i className="ri-add-line"></i>
          </motion.span>
        </div>
      </div>
    </Col>
  );
};
