/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import LogInButton from "../LoginButton/LoginButton";
import s from "./NavBar.module.css";
import LogOutButton from "../LogOutButton/LogOutButton.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import { saveUserinDB } from "../../helpers/saveUserinDB.js";

const NavBar = () => {
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    isAuthenticated && saveUserinDB(user);
  }, [user]);

  return (
    <div>
      <div className={s.background}>
        <div className={s.navBar}>
          <div className={s.left}>
            <Link to="/" className={s.btn_left}>
              <FontAwesomeIcon
                icon={faHome}
                className={s.iconHome}
                // onClick={(e) => handleClickHome(e)}
                alt="Home icon"
              />
            </Link>
            <Link to="/shop" className={s.btn_left}>
              Shop
            </Link>
            <Link to="/about" className={s.btn_left}>
              About Us
            </Link>
            {/* <img
              src=""
              alt="Logo"
              style={{ textDecoration: "none", color: "black" }}
            /> */}
            <Link to="/contact" className={s.btn_left}>
              Contact Us
            </Link>

            {isAuthenticated ? <LogOutButton /> : <LogInButton />}

            <div
              onClick={() => {
                console.log("abrir carrito");
              }}
              style={{ cursor: "pointer" }}
            >
              <Link
                to="/cart"
                className={s.btn_right}
                // onClick={window.location.reload}
              >
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className={s.iconCart}
                  alt="Shopping cart icon"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
