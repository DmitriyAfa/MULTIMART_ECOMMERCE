import React from "react";

// redux
import { useSelector } from "react-redux";

// reactstrap
import { Container, Row, Col } from "reactstrap";

// firebase
import { db } from "../firebase.config";
import { doc, deleteDoc } from "firebase/firestore";

// animation
import { toast } from "react-toastify";

export const AllProducts = React.memo(() => {
  const { products } = useSelector((state) => state.products);

  console.log(products.length > 0);

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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <h4 className="py-5 text-center fw-bold">Loading.......</h4>
                ) : (
                  products.map(({ id, imgUrl, title, category, price }) => {
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
});
