/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import s from "../ContactForm/Contact.module.css";
import TextField from "@mui/material/TextField";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import axios from "axios";
//import { toast } from "react-toastify";

const SERVICE_ID = process.env.REACT_APP_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY;

export default function Contact() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [textField, setTextField] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isTouched, setIsTouched] = useState(false); // Nuevo estado para controlar si el formulario ha sido tocado

  const validate = (values) => {
    const errors = {};

    // Validación del campo "name"
    if (!values.name) {
      errors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(values.name)) {
      errors.name = "Name cannot contain numbers";
    }

    // Validación del campo "lastname"
    if (!values.lastname) {
      errors.lastname = "Lastname is required";
    } else if (!/^[a-zA-Z\s]+$/.test(values.lastname)) {
      errors.lastname = "Lastname cannot contain numbers";
    }

    // Validación del campo "email"
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
      errors.email = "Invalid email format";
    }

    // Validación del campo "phone"
    if (!values.phone) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(values.phone)) {
      errors.phone = "Phone number must have 10 digits";
    }

    // Validación del campo "subject"
    if (!values.subject) {
      errors.subject = "Subject is required";
    }

    // Validación del campo "message"
    if (!values.message) {
      errors.message = "Message is required";
    }

    return errors;
  };

  const [submitted, setSubmitted] = useState(false);

  // useEffect(() => {
  //   if (submitted) {
  //     toast.success("Thank you! Your message was sent successfully");
  //     setSubmitted(false);
  //   }
  // }, [submitted]);

  useEffect(() => {
    const validationErrors = validate(textField);
    setErrors(validationErrors);
  }, [textField]);

  const handleChange = (e) => {
    setTextField({ ...textField, [e.target.name]: e.target.value });
    setIsTouched(true); // Actualizar el estado isTouched cuando el usuario comienza a escribir
  };

  const isFormInvalid = () => {
    return Object.values(errors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(textField);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    await postMessage();
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY).then(
      (result) => {
        console.log(result.text);
        Swal.fire({
          icon: "success",
          title: "Message Sent Successfully",
        });
      },
      (error) => {
        console.log(error.text);
        Swal.fire({
          icon: "error",
          title: "Oops, something went wrong",
          text: error.text,
        });
      }
    );
    setSubmitted(true);
    setTextField({
      name: "",
      lastname: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    });
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
      await axios.post("https://submit-form.com/RwQl1rfK", newMessage);
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
                        error={isTouched && Boolean(errors?.name)}
                        helperText={isTouched && errors?.name}
                      />
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
                        error={isTouched && Boolean(errors?.lastname)}
                        helperText={isTouched && errors?.lastname}
                      />
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
                        error={isTouched && Boolean(errors?.email)}
                        helperText={isTouched && errors?.email}
                      />
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
                        error={isTouched && Boolean(errors?.phone)}
                        helperText={isTouched && errors?.phone}
                      />
                    </div>
                    <TextField
                      variant="filled"
                      color="success"
                      focused
                      className={s.FormControl}
                      label="Subject"
                      id="fullWidth"
                      placeholder="Write the subject here"
                      value={textField.subject}
                      name="subject"
                      onChange={handleChange}
                      type="text"
                      error={isTouched && Boolean(errors?.subject)}
                      helperText={isTouched && errors?.subject}
                    />
                    <TextField
                      variant="filled"
                      color="success"
                      focused
                      className={s.FormControl}
                      label="Your Message"
                      id="fullWidth"
                      placeholder="Write your message here"
                      value={textField.message}
                      name="message"
                      onChange={handleChange}
                      multiline
                      rows={4}
                      error={isTouched && Boolean(errors?.message)}
                      helperText={isTouched && errors?.message}
                    />
                    <div className={s.FormGroup}>
                      <button
                        className={s.appButton}
                        type="submit"
                        disabled={isFormInvalid()}
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
