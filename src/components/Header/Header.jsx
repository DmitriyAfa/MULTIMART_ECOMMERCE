import React, { useEffect, useRef } from "react";

// styles
import "./header.scss";

// Router
import { Link, NavLink, useNavigate } from "react-router-dom";

// redux
import { useSelector } from "react-redux";

// reactstrap
import { Container, Row } from "reactstrap";

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
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const profileActionRef = useRef(null);

  const currentUser = useSelector((state) => state.user.user);
  const { users } = useSelector((state) => state.user);
  const { totalQuantity } = useSelector((state) => state.cart);

  // we get the user data from firebase
  const user = users?.filter(({ uid }) => uid === currentUser?.uid);

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

  const menuToggle = () => menuRef.current.classList.toggle("nav_active");

  const navigateToCart = () => {
    navigate("/cart");
  };

  const toggleProfileActions = () =>
    profileActionRef.current.classList.toggle("profile__actions_show");

  useEffect(() => {
    window.addEventListener("scroll", setStickyHeader);

    return () => window.removeEventListener("scroll", setStickyHeader);
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="header__nav">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <NavLink to="/home">
                  <h1>Multimart</h1>
                </NavLink>
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
                  src={currentUser?.photoURL ? currentUser?.photoURL : userIcon}
                  alt=""
                  onClick={toggleProfileActions}
                />

                <div
                  className="actions"
                  ref={profileActionRef}
                  onClick={toggleProfileActions}
                >
                  {currentUser?.displayName ? (
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <span className="_hover_primary" onClick={logout}>
                        Logout
                      </span>
                      {user[0]?.role === "admin" ? (
                        <Link to="/dashboard">Dashboard</Link>
                      ) : null}
                    </div>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <Link to="/signup">Signup</Link>
                      <Link to="/login">Login</Link>
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
