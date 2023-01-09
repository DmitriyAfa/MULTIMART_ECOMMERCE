import React from "react";

// uuid
import { v4 as uuidv4 } from "uuid";

// reactstrap
import { Container, Row, Col, Form, FormGroup } from "reactstrap";

// animation
import { motion } from "framer-motion";
import { toast } from "react-toastify";

// firebase
import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../services/hooks/useAuth";

// route
import { useNavigate } from "react-router-dom";

export const AddProduct = React.memo(() => {
  // ===data from firebase===
  const { currentUser } = useAuth();
  //  ===data from firebase===
  const [title, setTitle] = React.useState("");
  const [shortDesc, setShortDesc] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [rating, setRating] = React.useState(null);
  const [review, setReview] = React.useState("");
  const [productImg, setProductImg] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  console.log(currentUser);

  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    // add product to the firebase db

    try {
      const docRef = await collection(db, "products");

      const storageRef = ref(
        storage,
        `productImages/${Date.now() + productImg.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, productImg);

      uploadTask.on(
        () => {
          toast.error("Image is not updated");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(docRef, {
              id: uuidv4(),
              productName: title,
              shortDesc: shortDesc,
              description: description,
              category: category,
              price: price,
              imgUrl: downloadURL,
              reviews: [
                {
                  photoURL: currentUser?.photoURL,
                  name: currentUser?.displayName,
                  rating: rating,
                  text: review,
                  uid: currentUser?.uid,
                },
              ],
              avgRating: rating,
            });
          });
        }
      );
      setLoading(false);
      toast.success("product added successfully");
      navigate("/dashboard/all-products");
    } catch (err) {
      setLoading(false);
      toast.error(`product is not added`);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {loading ? (
              <h4 className="py-5">Loading........</h4>
            ) : (
              <>
                {" "}
                <h4 className="mb-5">Add Product</h4>
                <Form onSubmit={addProduct}>
                  <FormGroup className="form__group">
                    <span>Product title</span>
                    <input
                      type="text"
                      placeholder="Double sofa"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <span>Short Description</span>
                    <input
                      type="text"
                      placeholder="Lorem...."
                      value={shortDesc}
                      onChange={(e) => setShortDesc(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <span>Description</span>
                    <input
                      type="text"
                      placeholder="Description...."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <span>Review</span>
                    <input
                      type="text"
                      placeholder="Review...."
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <div className="form__group rating__group d-flex align-items-center gap-5">
                    <motion.span
                      whileTap={{ scale: 1.2 }}
                      onClick={() => setRating(1)}
                    >
                      1 <i className="ri-star-s-fill"></i>
                    </motion.span>
                    <motion.span
                      whileTap={{ scale: 1.2 }}
                      onClick={() => setRating(2)}
                    >
                      2 <i className="ri-star-s-fill"></i>
                    </motion.span>
                    <motion.span
                      whileTap={{ scale: 1.2 }}
                      onClick={() => setRating(3)}
                    >
                      3 <i className="ri-star-s-fill"></i>
                    </motion.span>
                    <motion.span
                      whileTap={{ scale: 1.2 }}
                      onClick={() => setRating(4)}
                    >
                      4 <i className="ri-star-s-fill"></i>
                    </motion.span>
                    <motion.span
                      whileTap={{ scale: 1.2 }}
                      onClick={() => setRating(5)}
                    >
                      5 <i className="ri-star-s-fill"></i>
                    </motion.span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between gap-5">
                    <FormGroup className="form__group w-50">
                      <span>Price</span>
                      <input
                        type="number"
                        placeholder="$100"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </FormGroup>
                    <FormGroup className="form__group w-50">
                      <span>Category</span>
                      <select
                        className="w-100 p-2"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option> Select category</option>
                        <option value="chair">Chair</option>
                        <option value="sofa">Sofa</option>
                        <option value="mobile">Mobile</option>
                        <option value="watch">Watch</option>
                        <option value="wireless">Wireless</option>
                      </select>
                    </FormGroup>
                  </div>

                  <div>
                    <FormGroup className="form__group">
                      <span>Product Image</span>
                      <input
                        type="file"
                        onChange={(e) => setProductImg(e.target.files[0])}
                        required
                      />
                    </FormGroup>
                  </div>

                  <button className="_buy-btn" type="submit">
                    Add Product
                  </button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
});
