/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
// import { faHome } from "@fortawesome/free-solid-svg-icons";
import LogInButton from "../LoginButton/LoginButton";
import s from "./NavBar.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { saveUserinDB } from "../../helpers/saveUserinDB.js";
import BurgerMenu from "./Burguer";
// import Admin from "../../views/Dashboard/DashboardContainer"

// import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
// import Form from 'react-bootstrap/Form';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useLocation } from "react-router-dom";
import SerchBar from "../SearchBar/SearchBar";
import "./stylenav.css";

const NavBar = () => {
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    isAuthenticated && saveUserinDB(user);
    console.log(user);
  }, [user]);

  const location = useLocation();

  return (
    <div>
      <div>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container className=".navbar" fluid>
            <Nav
              className="d-flex align-items-center "
              style={{ maxHeight: "150px" }}
            >
              <Link to="/" className="p-1 text-decoration-none ">
                <Navbar.Brand className="fs-3 ">Henry Winery</Navbar.Brand>
              </Link>
              <Link to="/shop" className="nav-link ml-2 mr-2 text-white">
                Shop
              </Link>
              <Link to="/about" className="nav-link ml-2 mr-2 text-white">
                About us
              </Link>
              <Link to="/contact" className="nav-link ml-2 mr-2 text-white">
                Contact us
              </Link>
            </Nav>
            <Nav style={{ maxWidth: 400 }}>
              {location.pathname == "/shop" ? (
                <SerchBar />
              ) : // "aca va el <searchbar>"
              null}
            </Nav>
            <Nav className="d-flex align-items-center ">
              {isAuthenticated && !user.isAdmin ? (
                <Link
                  to="/admin/users"
                  className="nav-link ml-2 mr-2 text-white"
                >
                  Dashboard
                </Link>
              ) : null}
              <Link to="/" className="nav-link ml-2 mr-2 text-white">
                <i className="bi bi-heart-fill fs-5"></i>
              </Link>
              <Link to="/cart" className="nav-link ml-2 mr-2 text-white">
                <i className="bi bi-cart3 fs-4"></i>
              </Link>
              {/* <Link to="/admin/users" className="navbar-brand" ><i className="bi bi-box-arrow-right fs-4"></i></Link> */}
              {isAuthenticated ? (
                <div className={s.userName}>
                  {" "}
                  Hi, {user.nickname}!
                  <BurgerMenu />
                </div>
              ) : (
                <LogInButton />
              )}
            </Nav>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};

export default NavBar;
