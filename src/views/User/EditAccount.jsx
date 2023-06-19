import React, { useState } from "react";
import { useDispatch } from "react-redux";
import s from "./UserComponent.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import validateAccount from "./validateAccount";
import { updateUser } from "../../Redux/Actions/actionsIndex";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";

export default function EditAccount() {
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();

  const [error, setError] = useState({});

  const [textField, setTextField] = useState({
    email: user.email,
    fullName: user.name,
    username: "",
    picture: "",
    birthday: "",
    addressLineOne: "",
    addressLineTwo: "",
    telephone: "",
  });

  function onInputChange(e) {
    setTextField({ ...textField, [e.target.name]: e.target.value });
    setError(
      validateAccount({ ...textField, [e.target.name]: e.target.value })
    );
  }

  const isButtonDisabled = () =>
    !textField.username || Object.keys(error).length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUser(textField));
    setTextField({
      email: user.email,
      fullName: user.name,
      username: "",
      picture: "",
      birthday: "",
      addressLineOne: "",
      addressLineTwo: "",
      telephone: "",
    });
    toast.success("Your information was updated successfully");
  };

  return (
    isAuthenticated && (
      <>
        <div className={s.EditContainer}>
          <div className={s.EditCard}>
            <h3>
              {" "}
              <u>Add your information</u>
            </h3>
            <form onSubmit={handleSubmit}>
              <div className={s.formSection}>
                <div className={s.formInput}>
                  <label htmlFor="">
                    • <u>Address:</u>
                  </label>
                  <TextField
                    size="small"
                    onInput={onInputChange}
                    name="addressLineOne"
                    type="text"
                    placeholder="Set a billing address."
                    value={user.addressLineOne}
                  />
                  {error.addressLineOne && (
                    <span className={s.formerror}>{error.addressLineOne}</span>
                  )}
                </div>
                <div className={s.formInput}>
                  <label htmlFor="">
                    • <u>City:</u>
                  </label>
                  <TextField
                    size="small"
                    onInput={onInputChange}
                    name="addressLineTwo"
                    type="text"
                    placeholder="Add your city."
                    value={user.addressLineTwo}
                  />
                  {error.addressLineTwo && (
                    <span className={s.formerror}>{error.addressLineTwo}</span>
                  )}
                </div>
                <div className={s.formInput}>
                  <label htmlFor="">
                    • <u>Phone:</u>
                  </label>
                  <TextField
                    size="small"
                    onInput={onInputChange}
                    name="telephone"
                    type="text"
                    placeholder="Add your phone-number."
                    value={user.telephone}
                  />
                  {error.telephone && (
                    <span className={s.formerror}>{error.telephone}</span>
                  )}
                </div>
              </div>
              <div className={s.formSection}>
                <div className={s.formInput}>
                  <label htmlFor="">
                    • <u>Username:</u>
                  </label>
                  <TextField
                    size="small"
                    onInput={onInputChange}
                    name="username"
                    type="text"
                    placeholder="Change your username."
                    value={user.username}
                  />
                  {error.username && (
                    <span className={s.formerror}>{error.username}</span>
                  )}
                </div>
                <div className={s.formInput}>
                  <label htmlFor="">
                    • <u>Birthday:</u>
                  </label>
                  <TextField
                    size="small"
                    onInput={onInputChange}
                    name="birthday"
                    type="text"
                    maxLength={10}
                    placeholder="Share your birthday."
                    value={user.birthday}
                  />
                  {error.birthday && (
                    <span className={s.formerror}>{error.birthday}</span>
                  )}
                </div>
                <div className={s.formInput}>
                  <label htmlFor="">
                    • <u>Profile Pic:</u>
                  </label>
                  <TextField
                    size="small"
                    onInput={onInputChange}
                    name="picture"
                    type="url"
                    placeholder="Change your avatar."
                  />
                </div>
                <div></div>
                <button
                  disabled={isButtonDisabled()}
                  type="submit"
                  className={s.sendButton}
                >
                  SEND
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  );
}
