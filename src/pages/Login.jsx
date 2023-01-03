import React from "react";

// styles
import "../styles/login.css";

// components
import { Helmet } from "../components/Helmet/Helmet";

// react-strap
import { Container, Row, Col, Form, FormGroup } from "reactstrap";

// router
import { Link } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <Helmet title={"Login"}>
      <section>
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold mb-4">Login</h3>
              <Form className="auth__form">
                <FormGroup className="form__group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Enter your password"
                  />
                </FormGroup>

                <button type="submit" className="buy__btn auth__btn">
                  Login
                </button>
                <p>
                  Don't have an account ?{" "}
                  <Link to="/signup">Create an account</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};
