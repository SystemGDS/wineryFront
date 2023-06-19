import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import s from "./UserComponent.module.css";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
// import Loading from "../PrivateRoutes/Loading";
import axios from "axios";

export default function AccountInfo() {
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  let { id } = useParams();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    axios.get(`/users${user?.name}`).then((res) => {
      setUsuario(res.data);
    });
    return () => {
      setUsuario(null);
    };
  }, [id]);

  function reverseString(str) {
    return str.split("-").reverse().join("-");
  }

  return (
    isAuthenticated && (
      <>
        <div>
          {usuario ? (
            <div className={s.AccountInfo}>
              <div className={s.AInfoCard}>
                <div className={s.topInfo}>
                  <h3 className={s.accountName}> {usuario[0].username}</h3>
                  <p>
                    •{" "}
                    <u>
                      <b>Birthday:</b>
                    </u>{" "}
                    {usuario[0].birthday
                      ? reverseString(usuario[0].birthday)
                      : "No birthday registered yet."}
                    .
                  </p>
                </div>
                <div>
                  <div className={s.infoBody}>
                    <img
                      src={usuario[0].picture}
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
                        {usuario[0].addressLineOne
                          .toLowerCase()
                          .replace(/(^|\s)\S/g, (match) => match.toUpperCase())}
                        , {""}
                        {usuario[0].addressLineTwo
                          .toLowerCase()
                          .replace(/(^|\s)\S/g, (match) => match.toUpperCase())}
                        .
                      </h4> */}
                      <h4>
                        • <u>Phone number:</u> {usuario[0].telephone}.
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
