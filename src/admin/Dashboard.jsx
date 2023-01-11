import React from "react";

// redux
import { useSelector } from "react-redux";

// styles
import "../styles/dashboard.scss";

// reactstrap
import { Container, Row, Col } from "reactstrap";

export const Dashboard = React.memo(() => {
  const { users } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);

  return (
    <section>
      <Container>
        <Row>
          <Col className="lg-3">
            <div className="box-revenue _box">
              <h5>Total Sales</h5>
              <span>$8327</span>
            </div>
          </Col>
          <Col className="lg-3">
            <div className="box-order _box">
              <h5>Orders</h5>
              <span>778</span>
            </div>
          </Col>
          <Col className="lg-3">
            <div className="box-products _box">
              <h5>Total Products</h5>
              <span>{products.length}</span>
            </div>
          </Col>
          <Col className="lg-3">
            <div className="box-users _box">
              <h5>Total Users</h5>
              <span>{users.length}</span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
});
