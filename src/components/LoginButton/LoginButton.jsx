/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import s from "../LoginButton/LogInButton.module.css";

const LogInButton = () => {
  const { loginWithRedirect, user } = useAuth0();

  return (
    <div>
      <button
        className={s.loginUser}
        onClick={() => {
          loginWithRedirect({
            // "https://henrywinery.netlify.app/" || "http://localhost:3000/"
            authorizationParams: { redirect_uri: window.location.origin + "/" },
          });
        }}
      >
        Login
      </button>
    </div>
  );
};

export default LogInButton;
