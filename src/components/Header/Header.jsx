// styles
import "./header.css";

// Router
import { NavLink } from "react-router-dom";

// reactstrap
import { Container, Row } from "reactstrap";

// assets
import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";

// animation
import { motion } from "framer-motion";

// consts

const nav__links = [
  { path: "home", display: "Home" },
  { path: "shop", display: "Shop" },
  { path: "cart", display: "Cart" },
];

export const Header = () => {
  return (
    <header>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>Multimart</h1>
                <p>Since 1995</p>
              </div>
            </div>

            <div className="navigation">
              <ul className="menu">
                {nav__links.map((l, i) => {
                  const { path, display } = l;

                  return (
                    <li className="nav__item" key={display}>
                      <NavLink
                        className={(navClass) =>
                          navClass.isActive ? "nav__active" : ""
                        }
                        to={path}
                      >
                        {display}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="nav__icons">
              <span className="fav__icon">
                <i className="ri-heart-line"></i>
                <span className="badge">2</span>
              </span>
              <span className="cart__icon">
                <i className="ri-shopping-bag-line"></i>
                <span className="badge">2</span>
              </span>
              <span className="">
                <motion.img whileTap={{ scale: 1.2 }} src={userIcon} alt="" />
              </span>
            </div>

            <div className="mobile__menu">
              <span className="">
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};
