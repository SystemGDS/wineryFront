/* eslint-disable no-unused-vars */
import React,{ useState } from "react";
import { useDispatch } from "react-redux";
// import validate from "./validate";
import s from "../ContactForm/Contact.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";

export default function Contact() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [textField, setTextField] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setTextField({ ...textField, [e.target.name]: e.target.value });
  };

  const isButtonDisabled = () => !(textField.name && textField.lastname);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(textField); //  setError(validate(textField));
    if (typeof error === "object") return;
    console.log(error);
    await postMessage();
    setTextField({
      name: "",
      lastname: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    });
    toast.success("Thank you! Your message was sent successfully");
  };

  const postMessage = async () => {
    const newMessage = {
      name: textField.name.trim(),
      lastname: textField.lastname.trim(),
      phone: textField.phone,
      email: textField.email,
      subject: textField.subject.trim(),
      message: textField.message.trim(),
    };
    try {
      const post = await axios.post(
        "https://submit-form.com/RwQl1rfK",
        newMessage
      );
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={s.headContainer}>
      <h1 className={s.centerTitle1}>
        Contact us to discover your perfect wine!
      </h1>
      <h3 className={s.centerTitle2}>
        ¿Do you have any inquiries or need recommendations?
      </h3>
      <p className={s.centerTitle3}>
        At Henry Winery, we are passionate about helping you find the ideal wine
        for every occasion. If you have questions about our products, need
        guidance on wine pairing, or seek personalized recommendations, feel
        free to get in touch with us. We are here to provide you with the best
        service. Send us a message, and we will be delighted to assist you.
      </p>
      <div className={s.background}>
        <div className={s.container}>
          <div className={s.screen}>
            <div className={s.screenBody}>
              <div className={s.screenBodyItemLeft}>
                <div className={s.appTitle}>
                  <span>CONTACT</span>
                  <span>US</span>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className={s.screenBodyItem}>
                  <div className={s.appForm}>
                    <div className={s.FormGroup}>
                      <TextField
                        variant="filled"
                        color="success"
                        focused
                        className={s.FormControl}
                        label="Name"
                        id="fullWidth"
                        placeholder="John"
                        value={textField.name}
                        name="name"
                        onChange={handleChange}
                        type="text"
                      />
                      {error?.name && <p className={s.error}>{error?.name}</p>}
                    </div>
                    <div className={s.FormGroup}>
                      <TextField
                        variant="filled"
                        color="success"
                        focused
                        className={s.FormControl}
                        label=" Last Name"
                        id="fullWidth"
                        placeholder="Remendez"
                        value={textField.lastname}
                        name="lastname"
                        onChange={handleChange}
                        type="text"
                      />
                      {error?.lastname && (
                        <p className={s.error}>{error?.lastname}</p>
                      )}
                    </div>

                    <div className={s.FormGroup}>
                      <TextField
                        variant="filled"
                        color="success"
                        focused
                        className={s.FormControl}
                        label="Email Address"
                        id="fullWidth"
                        placeholder="john.remendez@gmail.com"
                        value={textField.email}
                        name="email"
                        onChange={handleChange}
                        type="text"
                      />
                      {error?.email && (
                        <p className={s.error}>{error?.email}</p>
                      )}
                    </div>
                    <div className={s.FormGroup}>
                      <TextField
                        variant="filled"
                        color="success"
                        focused
                        className={s.FormControl}
                        label="PHONE NUMBER"
                        id="fullWidthf"
                        placeholder="+1 971 XXX XXXX"
                        value={textField.phone}
                        name="phone"
                        onChange={handleChange}
                        type="text"
                      />
                      {error?.phone && (
                        <p className={s.error}>{error?.phone}</p>
                      )}
                    </div>
                    <TextField
                      variant="filled"
                      color="success"
                      focused
                      className={s.FormControl}
                      label="SUBJECT"
                      id="fullWidthf"
                      placeholder="Wines"
                      value={textField.subject}
                      name="subject"
                      onChange={handleChange}
                      type="text"
                    />
                    {error?.subject && (
                      <p className={s.error}>{error?.subject}</p>
                    )}
                    <div className={s.FogitrmGroupMessage}>
                      <TextField
                        className={s.FormControl}
                        variant="filled"
                        color="success"
                        focused
                        label="Message"
                        id="fullWidth"
                        placeholder="Write your message here..."
                        value={textField.message}
                        name="message"
                        multiline
                        onChange={handleChange}
                      />
                    </div>
                    <div className={s.FormGroupButtons}>
                      <button
                        disabled={isButtonDisabled()}
                        type="submit"
                        className={s.formButton}
                      >
                        SEND
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
