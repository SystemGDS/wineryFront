import React from "react";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import s from "./UserComponent.module.css";
import UserSideBar from "./UserSideBar";

export default function UserComponent() {
  return (
    <>
      <div className={s.everything}>
        <div className={s.NavBar}>
          <NavBar />
        </div>

        <div className={s.UserContainer}>
          <UserSideBar />
        </div>
        <div className={s.foot}>
          <Footer />
        </div>
      </div>
    </>
  );
}
