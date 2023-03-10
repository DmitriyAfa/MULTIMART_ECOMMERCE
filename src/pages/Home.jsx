import React, { useState, useEffect } from "react";

// styles
import "../styles/home.scss";

// redux
import { useSelector } from "react-redux";

// components
import { Helmet } from "../components/Helmet/Helmet";
import { Service } from "../components/Service/Service";
import { ProductsList } from "../components/UI/ProductsList";
import { Clock } from "../components/UI/Clock";

// reactstrap
import { Col, Container, Row } from "reactstrap";

// images
import heroImg from "../assets/images/hero-img.png";
import counterImage from "../assets/images/counter-timer-img.png";

// router
import { Link } from "react-router-dom";

// animation
import { motion } from "framer-motion";

export const Home = React.memo(() => {
  const { products } = useSelector((state) => state.products);

  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  const year = new Date().getFullYear();

  useEffect(() => {
    const filteredTrendingProducts = products.filter(
      ({ category }) => category === "chair"
    );
    const filteredBestSalesProducts = products.filter(
      ({ category }) => category === "sofa"
    );
    const filteredMobileProducts = products.filter(
      ({ category }) => category === "mobile"
    );
    const filteredWirelessProducts = products.filter(
      ({ category }) => category === "wireless"
    );
    const filteredPopularProducts = products.filter(
      ({ category }) => category === "watch"
    );

    setTrendingProducts(filteredTrendingProducts);
    setBestSalesProducts(filteredBestSalesProducts);
    setMobileProducts(filteredMobileProducts);
    setWirelessProducts(filteredWirelessProducts);
    setPopularProducts(filteredPopularProducts);
  }, [products]);

  return (
    <Helmet title={"Home"}>
      <section className="hero">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <p className="hero__subtitle">Trending product in {year}</p>
                <h2>Make Your Interior More Minimalistic & Modern</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ducimus cum praesentium facilis at cupiditate incidunt
                  adipisci, mollitia ab culpa earum, nihil doloribus! Tenetur
                  nobis aliquam fugiat placeat quasi. Molestiae, quisquam.
                </p>
                <motion.button whileTap={{ scale: 1.2 }} className="_buy-btn">
                  <Link to={"/shop"}>SHOP NOW</Link>
                </motion.button>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Service />

      <section className="trending__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Trending Products</h2>
            </Col>

            {products.length === 0 ? (
              <h5 className="fw-bold">Loading......</h5>
            ) : (
              <ProductsList data={trendingProducts} />
            )}
          </Row>
        </Container>
      </section>

      <section className="best__sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Best Sales</h2>
            </Col>
            {products.length === 0 ? (
              <h5 className="fw-bold">Loading......</h5>
            ) : (
              <ProductsList data={bestSalesProducts} />
            )}
          </Row>
        </Container>
      </section>

      <section className="timer-count">
        <Container>
          <Row>
            <Col lg="6" md="12" className="count__down-col">
              <div className="clock__top-content">
                <h4 className="text-white fs-6 mb-2">Limited Offer</h4>
                <h3 className="text-white fs-5 mb-3">Quality Armchair</h3>
              </div>
              <Clock />

              <motion.button
                whileTap={{ scale: 1.2 }}
                className="_buy-btn _store-btn"
              >
                <Link to="/shop">Visit Store</Link>
              </motion.button>
            </Col>
            <Col lg="6" md="12" className="text-end _counter-img">
              <img src={counterImage} alt="" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="new-arrivals">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title">New Arrivals</h2>
            </Col>

            {products.length === 0 ? (
              <h5 className="fw-bold">Loading......</h5>
            ) : (
              <ProductsList data={mobileProducts} />
            )}
            {products.length === 0 ? (
              <h5 className="fw-bold">Loading......</h5>
            ) : (
              <ProductsList data={wirelessProducts} />
            )}
          </Row>
        </Container>
      </section>

      <section className="popular-category">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title">Popular in Category</h2>
            </Col>

            {products.length === 0 ? (
              <h5 className="fw-bold">Loading......</h5>
            ) : (
              <ProductsList data={popularProducts} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
});
