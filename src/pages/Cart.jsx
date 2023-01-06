import React from "react";

// styles
import "../styles/cart.css";

// components
import { Helmet } from "../components/Helmet/Helmet";
import { CommonSection } from "../components/UI/CommonSection";

//redux
import { useSelector, useDispatch } from "react-redux";
import { deleteCartItem } from "../services/redux/slices/cartSlice";

// animation
import { motion } from "framer-motion";

// react-strap
import { Container, Row, Col } from "reactstrap";

// router
import { Link } from "react-router-dom";

export const Cart = React.memo(() => {
  const { cartItems } = useSelector((state) => state.cart);
  const { totalAmount } = useSelector((state) => state.cart);

  return (
    <Helmet title={"Cart"}>
      <CommonSection title={"Shopping Cart"} />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {cartItems.length === 0 ? (
                <h2 className="fs-4 text-center">No item added to the cart</h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cartItems.map((item) => {
                      return <Tr item={item} />;
                    })}
                  </tbody>
                </table>
              )}
            </Col>
            <Col lg="3">
              <div>
                <h6 className="d-flex align-items-center justify-content-between">
                  Subtotal<span className="fs-4 fw-bold">${totalAmount}</span>
                </h6>
              </div>
              <p className="fs-6 mt-2">
                taxes and shipping will calculate in checkout
              </p>
              <div>
                <button className="buy__btn w-100">
                  <Link to="/checkout">Checkout</Link>
                </button>
                <button className="buy__btn w-100 mt-3">
                  <Link to="/shop">Continue Shopping</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
});

const Tr = React.memo(({ item }) => {
  const { imgUrl, productName, price, quantity, id } = item;
  const dispatch = useDispatch();
  const deleteProduct = () => {
    dispatch(deleteCartItem(id));
  };
  return (
    <tr key={imgUrl}>
      <td>
        <img src={imgUrl} alt="" />
      </td>
      <td>{productName}</td>
      <td>${price}</td>
      <td>{quantity}px</td>
      <td>
        <motion.i
          whileTap={{ scale: 1.2 }}
          onClick={deleteProduct}
          className="ri-delete-bin-line"
        ></motion.i>
      </td>
    </tr>
  );
});
