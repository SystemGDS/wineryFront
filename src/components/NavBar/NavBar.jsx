/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import LogInButton from "../LoginButton/LoginButton";
import s from "./NavBar.module.css";

import { useAuth0 } from "@auth0/auth0-react";
import { saveUserinDB } from "../../helpers/saveUserinDB.js";
import BurgerMenu from "./Burguer";

const NavBar = () => {
  const { isAuthenticated, user } = useAuth0();
  const isAdmin = undefined;

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
            <Link to="/contact" className={s.btn_left}>
              Contact Us
            </Link>
            <Link to="/admin" className={s.btn_left}>
              Admin
            </Link>
            <Link to="/uploader" className={s.btn_left}>
              Cargar
            </Link>
            <div className={s.right}>
              {isAuthenticated ? (
                <>
                  <div className={s.userName}>
                    {" "}
                    Hi, {user.nickname}!
                    <BurgerMenu />
                  </div>
                </>
              ) : (
                <LogInButton className={s.btn_right} />
              )}
              {isAdmin && (
                <Link to="/admin" className={s.btn_right}>
                  Admin dashboard
                </Link>
              )}
              <Link to="/cart" className={s.btn_right}>
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
