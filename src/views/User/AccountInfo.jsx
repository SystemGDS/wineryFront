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
  const localUser = useSelector((state) => state.user);
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
                  <h3 className={s.accountName}> {user.nickname}</h3>
                </div>
                <div>
                  <div className={s.infoBody}>
                    <img
                      src={localUser.image || user.picture}
                      alt="userPic"
                      className={s.profilePic}
                    />
                    <div className={s.contactInfo}>
                      <h2>
                        <u>Contant info</u>
                      </h2>
                      <hr />
                      {/* <h4>
                        • <u>Default Billing Address:</u>{" "}
                        {user[0].addressLineOne
                          .toLowerCase()
                          .replace(/(^|\s)\S/g, (match) => match.toUpperCase())}
                        , {""}
                        {user[0].addressLineTwo
                          .toLowerCase()
                          .replace(/(^|\s)\S/g, (match) => match.toUpperCase())}
                        .
                      </h4> */}
                      <h4>
                        • <u>Phone number:</u> {user.email}.
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
