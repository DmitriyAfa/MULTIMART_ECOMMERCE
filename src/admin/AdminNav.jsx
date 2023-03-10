import React from "react";

// redux
import { useSelector } from "react-redux";

// styles
import "../styles/admin-nav.scss";

// reactstrap
import { Container, Row } from "reactstrap";

// router
import { NavLink } from "react-router-dom";

const admin__nav = [
  {
    display: "Dashboard",
    path: "/dashboard",
  },
  {
    display: "All-Products",
    path: "/dashboard/all-products",
  },
  {
    display: "Orders",
    path: "/dashboard/orders",
  },
  {
    display: "Users",
    path: "/dashboard/users",
  },
  {
    display: "Add-Product",
    path: "/dashboard/add-product",
  },
];

export const AdminNav = React.memo(() => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <header className="admin__header">
        <div className="admin__nav-top">
          <Container>
            <div className="admin__nav-wrapper-top">
              <div className="logo">
                <NavLink to="/home">
                  <h2>Multimart</h2>
                </NavLink>
              </div>

              <div className="search__box">
                <input type="text" placeholder="Search....." />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
              <div className="admin__nav-top_right">
                <span>
                  <i className="ri-notification-3-line"></i>
                </span>
                <span>
                  <i className="ri-settings-5-line"></i>
                </span>
                <img src={user && user.photoURL} alt="" />
              </div>
            </div>
          </Container>
        </div>
      </header>

      <section className="admin__menu p-0">
        <Container>
          <Row>
            <div className="admin__navigation">
              <ul className="admin__menu-list">
                {admin__nav.map(({ path, display }) => {
                  return (
                    <li className="admin__menu-item" key={display}>
                      <NavLink
                        className={(navClass) =>
                          navClass.isActive ? "_admin-menu_active" : ""
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
          </Row>
        </Container>
      </section>
    </>
  );
});
