import React from "react";

// styles
import "../styles/login.scss";

// components
import { Helmet } from "../components/Helmet/Helmet";

// animation
import { toast } from "react-toastify";

// react-strap
import { Container, Row, Col, Form, FormGroup } from "reactstrap";

// router
import { Link, useNavigate } from "react-router-dom";

// firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase.config";

export const Signup = React.memo(() => {
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // router
  const navigate = useNavigate();

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

      /*
        метод ref()
       Returns a StorageReference for the given url.
       Возвращает StorageReference для данного URL-адреса.

       метод uploadBytesResumable()
        Uploads data to this object's location. The upload can be paused and resumed, and exposes progress updates.
        Загружает данные в местоположение этого объекта. Загрузку можно приостановить и возобновить, а также отображать обновления о ходе выполнения.
      */
      const storageRef = ref(storage, `iamges/${Date.now() + userName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downoloadURL) => {
            // update user profile
            await updateProfile(user, {
              displayName: userName,
              photoURL: downoloadURL,
            });

            // store user data in firestore database
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName: userName,
              email,
              photoURL: downoloadURL,
              role: "user",
            });
          });
        }
      );

      setLoading(false);
      toast.success("Account created");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast.error("something went wrong");
    }
  };

  return (
    <Helmet title={"Signup"}>
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <h5 className="fw-bold">Loading.....</h5>
              </Col>
            ) : (
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

                  <button type="submit" className="_buy-btn auth__btn">
                    Create an Account
                  </button>
                  <p>
                    Already have an account ? <Link to="/login">Login</Link>
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
