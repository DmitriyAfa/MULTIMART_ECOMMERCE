import React from "react";

// styles
import "../styles/login.css";

// components
import { Helmet } from "../components/Helmet/Helmet";

// animation
import { toast } from "react-toastify";

// react-strap
import { Container, Row, Col, Form, FormGroup } from "reactstrap";

// router
import { Link, useNavigate } from "react-router-dom";

// firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";

export const Login = React.memo(() => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const signin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;

      setLoading(false);
      toast.success("logged in");
      navigate("/checkout");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <Helmet title={"Login"}>
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <h5 className="fw-bold">Loading.....</h5>
              </Col>
            ) : (
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

                  <button
                    onClick={signin}
                    type="submit"
                    className="buy__btn auth__btn"
                  >
                    Login
                  </button>
                  <p>
                    Don't have an account ?{" "}
                    <Link to="/signup">Create an account</Link>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
});
