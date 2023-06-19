import React from "react";
import s from "./UserComponent.module.css";
import UserSideBar from "./UserSideBar";

export default function UserComponent() {
  return (
    <>
      <div className={s.everything}>
        <div className={s.UserContainer}>
          <UserSideBar />
        </div>
      </div>
    </>
  );
}
