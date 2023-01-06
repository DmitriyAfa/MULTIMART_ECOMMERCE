import React, { useEffect, useRef } from "react";

// styles
import "./header.scss";

// Router
import { Link, NavLink, useNavigate } from "react-router-dom";

// redux
import { useSelector } from "react-redux";

// reactstrap
import { Container, Row } from "reactstrap";

// hooks
import { useAuth } from "../../services/hooks/useAuth";

// firebase
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";

// assets
import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";

// animation
import { motion } from "framer-motion";
import { toast } from "react-toastify";

// consts

const nav__links = [
  { path: "home", display: "Home" },
  { path: "shop", display: "Shop" },
  { path: "cart", display: "Cart" },
];

export const Header = React.memo(() => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const profileActionRef = useRef(null);

  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { totalQuantity } = useSelector((state) => state.cart);

  const setStickyHeader = () => {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      headerRef.current.classList.add("header_sticky");
    } else {
      headerRef.current.classList.remove("header_sticky");
    }
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out");
        navigate("/home");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    window.addEventListener("scroll", setStickyHeader);

    return () => window.removeEventListener("scroll", setStickyHeader);
  }, []);

  const menuToggle = () => menuRef.current.classList.toggle("nav_active");

  const navigateToCart = () => {
    navigate("/cart");
  };

  const toggleProfileActions = () =>
    profileActionRef.current.classList.toggle("profile__actions_show");

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="header__nav">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>Multimart</h1>
              </div>
            </div>

            <nav className="nav" ref={menuRef} onClick={menuToggle}>
              <ul className="nav__menu">
                {nav__links.map((l, i) => {
                  const { path, display } = l;

                  return (
                    <li className="nav__item" key={display}>
                      <NavLink
                        className={(navClass) =>
                          navClass.isActive ? "_nav-link_active" : ""
                        }
                        to={path}
                      >
                        {display}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="header__icons">
              <span className="icon-fav">
                <i className="ri-heart-line"></i>
                <span className="badge">2</span>
              </span>
              <span className="icon-cart" onClick={navigateToCart}>
                <i className="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>

              <div className="header__profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser ? currentUser.photoURL : userIcon}
                  alt=""
                  onClick={toggleProfileActions}
                />

                <div
                  className="actions"
                  ref={profileActionRef}
                  onClick={toggleProfileActions}
                >
                  {currentUser ? (
                    <span onClick={logout}>Logout</span>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <Link to="/signup">Signup</Link>
                      <Link to="/login">Login</Link>
                      <Link to="/dashboard">Dashboard</Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
});
