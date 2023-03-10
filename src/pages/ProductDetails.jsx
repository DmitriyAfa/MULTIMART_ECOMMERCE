import React from "react";

// styles
import "../styles/product-details.scss";

// react-strap
import { Container, Row, Col, NavLink } from "reactstrap";

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
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../services/redux/slices/cartSlice";

// firebase
import { db } from "../firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const ProductDetails = React.memo(() => {
  const dispatch = useDispatch();
  const params = useParams();

  const [product, setProduct] = React.useState({});
  const [tab, setTab] = React.useState("desc");
  const [rating, setRating] = React.useState(null);

  const reviewMSG = React.useRef("");

  const { user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);

  // ===data from firebase===
  const currentProductRef = doc(db, "products", params.id);
  //  ===data from firebase===

  const {
    imgUrl,
    id,
    productName,
    reviews,
    description,
    shortDesc,
    price,
    category,
  } = product;

  const getRating = () => {
    const ratingSum = reviews?.reduce((agg, item) => {
      return (agg += item.rating);
    }, 0);
    return ratingSum / reviews?.length;
  };

  React.useEffect(() => {
    const getProduct = async () => {
      const docSnap = await getDoc(currentProductRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.log("no the product!");
      }
    };
    getProduct();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    const reviewUserMSG = reviewMSG.current.value;

    let reviewData;

    if (!rating) {
      toast.error("Please, choose rating");
    } else {
      reviewData = {
        photoURL: user?.photoURL,
        name: user?.displayName,
        rating: rating,
        text: reviewUserMSG,
        uid: user?.uid,
      };

      await updateDoc(currentProductRef, {
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

  const avgRating = getRating();
  const relatedProducts = products.filter((item) => item.category === category);

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
                              uid === user?.uid ? "_own-rating" : ""
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
                            className={rating === 1 ? "_star-coral" : ""}
                          >
                            1 <i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(2)}
                            className={rating === 2 ? "_star-coral" : ""}
                          >
                            2 <i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(3)}
                            className={rating === 3 ? "_star-coral" : ""}
                          >
                            3 <i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(4)}
                            className={rating === 4 ? "_star-coral" : ""}
                          >
                            4 <i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(5)}
                            className={rating === 5 ? "_star-coral" : ""}
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

                        {user ? (
                          <motion.button
                            whileTap={{ scale: 1.2 }}
                            type="submit"
                            className="_buy-btn"
                          >
                            Submit
                          </motion.button>
                        ) : (
                          <div className="go-auth">
                            You need
                            <NavLink to="/login">login</NavLink> or
                            <NavLink to="/signup">signup</NavLink>
                          </div>
                        )}
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
