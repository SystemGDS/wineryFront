/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./UserComponent.module.css";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { filterUsersByEmail } from "../../Redux/Actions/actionsIndex";
// import Loading from "../PrivateRoutes/Loading";
import axios from "axios";

export default function AccountInfo() {
  const { user, isAuthenticated } = useAuth0();
  const usuario = useSelector((state) => state.user);

  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(filterUsersByEmail(user.email));
  }, []);

  function reverseString(str) {
    return str.split("-").reverse().join("-");
  }

  return (
    isAuthenticated && (
      <>
        <div>
          {user ? (
            <div className={s.AccountInfo}>
              <div className={s.AInfoCard}>
                <div className={s.topInfo}>
                  <h3 className={s.accountName}>
                    {" "}
                    <u>Contact Info</u>
                  </h3>
                </div>
                <div>
                  <div className={s.infoBody}>
                    <img
                      src={user.picture}
                      alt="userPic"
                      className={s.profilePic}
                    />

                    <div className={s.contactInfo}>
                      <h2>
                        <u className={s.contactEmoji}>👥</u>
                      </h2>
                      <h4>
                        • <u>Username:</u> {user.nickname}
                      </h4>
                      <h4>
                      • <u>Birthday:</u> {usuario.birthday || user.birthday}
                      </h4>
                      <h4>
                        • <u>Direction:</u> {usuario.direction || user.direction}
                      </h4>
                      <h4>
                        • <u>Email:</u> {user.email}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={s.AccountInfo}>{/* <Loading /> */}</div>
          )}{" "}
        </div>
      </>
    )
  );
}
