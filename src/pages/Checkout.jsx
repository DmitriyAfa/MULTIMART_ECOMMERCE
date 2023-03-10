import React from "react";

// styles
import "../styles/checkout.scss";

// react-strap
import { Container, Row, Col, Form, FormGroup } from "reactstrap";

// components
import { Helmet } from "../components/Helmet/Helmet";
import { CommonSection } from "../components/UI/CommonSection";

// redux
import { useSelector } from "react-redux";

export const Checkout = React.memo(() => {
  const { totalQuantity, totalAmount } = useSelector((state) => state.cart);
  return (
    <Helmet title={"Checkout"}>
      <CommonSection title={"Checkout"} />

      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold">Billin Information</h6>
              <Form className="billing__form">
                <FormGroup className="form__group">
                  <input type="text" placeholder="Enter your name" required />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="email" placeholder="Enter your email" required />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="number" placeholder="Phone number" required />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="text" placeholder="Street address" required />
                </FormGroup>
              </Form>
            </Col>
            <Col lg="4">
              <div className="checkout__cart">
                <h6>
                  Total Qty: <span>{totalQuantity} items</span>
                </h6>
                <h6>
                  Subtotal: <span>${totalAmount}</span>
                </h6>
                <h6>
                  <span>
                    Shipping: <br /> free shipping
                  </span>
                  <span>$0</span>
                </h6>
                <h4>
                  Total cost: <span>${totalAmount}</span>
                </h4>
                <button className="_buy-btn _store-btn w-100">
                  Place an order
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
});
