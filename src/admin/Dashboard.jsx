import React from "react";

// reactstrap
import { Container, Row, Col } from "reactstrap";

export const Dashboard = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col className="lg-3">
            <div className="revenue__box">
              <h5>Total Sales</h5>
              <span>$8327</span>
            </div>
          </Col>
          <Col className="lg-3">
            <div className="order__box">
              <h5>Orders</h5>
              <span>778</span>
            </div>
          </Col>
          <Col className="lg-3">
            <div className="porducts__box">
              <h5>Total Products</h5>
              <span>778</span>
            </div>
          </Col>
          <Col className="lg-3">
            <div className="users__box">
              <h5>Total Users</h5>
              <span>78</span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
