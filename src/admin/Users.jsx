import React from "react";

// reactstrap
import { Container, Row, Col } from "reactstrap";

// hooks
import { useGetData } from "../services/hooks/useGetData";

// firebase
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";

// animation
import { toast } from "react-toastify";

export const Users = React.memo(() => {
  const { data: usersData, loading } = useGetData("users");

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    toast.success("The user was deleted");
  };
  return (
    <Container>
      <Row>
        <Col lg="12">
          <h4 className="fw-bold">Users</h4>
        </Col>
        <Col lg="12" className="pt-5">
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Username</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <h4 className="pt-5 fw-bold">Loading.......</h4>
              ) : (
                usersData?.map(({ photoURL, displayName, email, uid }) => {
                  return (
                    <tr key={uid}>
                      <td>
                        <img src={photoURL} alt="" />
                      </td>
                      <td>{displayName}</td>
                      <td>{email}</td>
                      <td>
                        <button
                          onClick={() => deleteUser(uid)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
});
