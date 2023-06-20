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
    name: user.name,
    userName: "",
    image: "",
    direction: "",
    birthday: "",
  });

  function onInputChange(e) {
    setTextField({ ...textField, [e.target.name]: e.target.value });
    setError(
      validateAccount({ ...textField, [e.target.name]: e.target.value })
    );
  }

  const isButtonDisabled = () =>
    !textField.userName || Object.keys(error).length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUser(textField));
    setTextField({
      email: user.email,
      name: user.name,
      userName: "",
      image: "",
      direction: "",
      birthday: "",
    });
    toast.success("Your information was updated successfully");
  };

  return (
    isAuthenticated && (
      <>
        <div className={s.EditContainer}>
          <div className={s.EditCard}>
            <h3 className={s.addinformation}>
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
                    name="direction"
                    type="text"
                    placeholder="Set a billing address.."
                    value={user.direction}
                  />
                  {error.direction && (
                    <span className={s.formerror}>{error.direction}</span>
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
                    placeholder="Share your birthday.."
                    value={textField.birthday}
                  />
                  {error.birthday && (
                    <span className={s.formerror}>{error.birthday}</span>
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
                    name="userName"
                    type="text"
                    placeholder="Change your username.."
                    value={user.userName}
                  />
                  {error.userName && (
                    <span className={s.formerror}>{error.userName}</span>
                  )}
                </div>
                <div className={s.formInput}>
                  <label htmlFor="">
                    • <u>Profile Pic:</u>
                  </label>
                  <TextField
                    size="small"
                    onInput={onInputChange}
                    name="image"
                    type="url"
                    placeholder="Change your avatar with a URL.."
                  />
                </div>

                <div></div>
                <button
                  disabled={isButtonDisabled}
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
