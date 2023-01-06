import React from "react";

// styles
import "../styles/dashboard.scss";

// reactstrap
import { Container, Row, Col } from "reactstrap";

// hooks
import { useGetData } from "../services/hooks/useGetData";

export const Dashboard = React.memo(() => {
  const { data: products } = useGetData("products");
  const { data: users } = useGetData("users");

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
