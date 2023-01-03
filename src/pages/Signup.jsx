import React from "react";

// styles
import "../styles/login.css";

// components
import { Helmet } from "../components/Helmet/Helmet";

// react-strap
import { Container, Row, Col, Form, FormGroup } from "reactstrap";

// router
import { Link } from "react-router-dom";

// firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";

export const Signup = () => {
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // firebase
  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;

      console.log(user);
    } catch (error) {}
  };

  return (
    <Helmet title={"Signup"}>
      <section>
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold mb-4">Signup</h3>
              <Form className="auth__form" onSubmit={signup}>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </FormGroup>
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
                <FormGroup className="form__group">
                  <input
                    onChange={(e) => setFile(e.target.files[0])}
                    type="file"
                  />
                </FormGroup>

                <button type="submit" className="buy__btn auth__btn">
                  Create an Account
                </button>
                <p>
                  Already have an account ? <Link to="/login">Login</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};
