import React from "react";

// styles
import "../styles/product-details.scss";

// react-strap
import { Container, Row, Col } from "reactstrap";

// router
import { useParams } from "react-router-dom";

// animation
import { motion } from "framer-motion";
import { toast } from "react-toastify";

// components
import { Helmet } from "../components/Helmet/Helmet";
import { CommonSection } from "../components/UI/CommonSection";
import { ProductsList } from "../components/UI/ProductsList";

// redux
import { useDispatch } from "react-redux";
import { addCartItem } from "../services/redux/slices/cartSlice";

// firebase
import { db } from "../firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

// hooks
import { useGetData } from "../services/hooks/useGetData";
import { useAuth } from "../services/hooks/useAuth";

export const ProductDetails = React.memo(() => {
  const params = useParams();
  // ===data from firebase===
  const { currentUser } = useAuth();
  const { data: products } = useGetData("products");
  const docRef = doc(db, "products", params.id);
  //  ===data from firebase===
  const dispatch = useDispatch();
  const [product, setProduct] = React.useState({});
  const [tab, setTab] = React.useState("desc");
  const reviewMSG = React.useRef("");
  const [rating, setRating] = React.useState(null);

  const {
    imgUrl,
    id,
    productName,
    avgRating,
    reviews,
    description,
    shortDesc,
    price,
    category,
  } = product;

  React.useEffect(() => {
    const getProduct = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.log("no the product!");
      }
    };
    getProduct();
  }, []);

  const relatedProducts = products.filter((item) => item.category === category);

  const submitHandler = async (e) => {
    e.preventDefault();

    const reviewUserMSG = reviewMSG.current.value;

    let reviewData;

    if (!rating) {
      toast.error("Please, choose rating");
    } else {
      reviewData = {
        photoURL: currentUser?.photoURL,
        name: currentUser?.displayName,
        rating: rating,
        text: reviewUserMSG,
        uid: currentUser?.uid,
      };

      await updateDoc(docRef, {
        reviews: [...reviews, reviewData],
      })
        .then(() => {
          toast.success("Review submited");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const addToCart = () => {
    dispatch(
      addCartItem({
        id,
        productName,
        iamge: imgUrl,
        price,
      })
    );
    toast.success("Product added successfully");
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt=""></img>
            </Col>
            <Col lg="6">
              <div className="product__details">
                <h2>{productName}</h2>
                <div className="product__rating d-flex align-items-center gap-5 mb-3">
                  <div>
                    <span>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-half-s-line"></i>
                    </span>
                  </div>
                  <p>
                    (<span>{avgRating}</span> ratings)
                  </p>
                </div>
                <div className="d-flex align-items-center gap-5">
                  <span className="product__price">${price}</span>
                  <span>Category: {category?.toUpperCase()}</span>
                </div>
                <p className="mt-3">{shortDesc}</p>

                <motion.button
                  onClick={addToCart}
                  whileTap={{ scale: 1.2 }}
                  className="_buy-btn"
                >
                  Add to Card
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6
                  className={`${tab === "desc" ? "tab_active" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                <h6
                  className={`${tab === "rev" ? "tab_active" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Reviews ({reviews?.length})
                </h6>
              </div>

              {tab === "desc" ? (
                <div className="tab__content mt-5">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product__review mt-5">
                  <div className="review__wrapper">
                    <ul>
                      {reviews?.map(({ rating, text, uid, name }, index) => {
                        return (
                          <li
                            className={`mb-4 ${
                              uid === currentUser?.uid ? "_own-rating" : ""
                            }`}
                            key={rating + index}
                          >
                            <h6>{name}</h6>
                            <span>{rating} (rating)</span>
                            <p>{text}</p>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="review__form">
                      <h4>Leave your experience</h4>
                      <form action="" onSubmit={submitHandler}>
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

                        <div className="form__group">
                          <textarea
                            ref={reviewMSG}
                            rows={4}
                            type="text"
                            placeholder="Review Message..."
                            required
                          />
                        </div>

                        <motion.button
                          whileTap={{ scale: 1.2 }}
                          type="submit"
                          className="_buy-btn"
                        >
                          Submit
                        </motion.button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>
            <Col lg="12" className="mt-5">
              <h2 className="related__title">You might also like</h2>
            </Col>
            <ProductsList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
});
