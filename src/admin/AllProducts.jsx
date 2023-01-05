import React from "react";

// reactstrap
import { Container, Row, Col } from "reactstrap";

// hooks
import { useGetData } from "../services/hooks/useGetData";

// firebase
import { db } from "../firebase.config";
import { doc, deleteDoc } from "firebase/firestore";

// animation
import { toast } from "react-toastify";

export const AllProducts = () => {
  const { data: productsData, loading } = useGetData("products");

  console.log(productsData);

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    toast.success("Deleted");
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>
                    <button className="btn btn-danger">Delete</button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <h4 className="py-5 text-center fw-bold">Loading.......</h4>
                ) : (
                  productsData.map(({ id, imgUrl, title, category, price }) => {
                    return (
                      <tr key={id}>
                        <td>
                          <img src={imgUrl} alt="" />
                        </td>
                        <td>{title}</td>
                        <td>{category}</td>
                        <td>${price}</td>
                        <td>
                          <button
                            onClick={() => deleteProduct(id)}
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
    </section>
  );
};
