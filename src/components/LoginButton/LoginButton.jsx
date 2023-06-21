/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import s from "../LoginButton/LogInButton.module.css";
import { Link } from "react-router-dom";

const LogInButton = () => {
  const { loginWithRedirect, user } = useAuth0();

  return (
      <Link
      className="nav-link ml-2 mr-2 text-white"
        onClick={() => {
          loginWithRedirect({
            // "https://henrywinery.netlify.app/" || "http://localhost:3000/"
            authorizationParams: { redirect_uri: window.location.origin + "/" },
          });
        }}
      ><i className="bi bi-box-arrow-in-left fs-4"></i>
      </Link>
  );
};

export default LogInButton;
