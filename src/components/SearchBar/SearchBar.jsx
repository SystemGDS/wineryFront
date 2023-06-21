import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameWine } from "../../Redux/Actions/actionsIndex";
// import styles from "./SearchBar.module.css";
// import buscar from "../../img/buscar.png";
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function SerchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(event) {
    setName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(getNameWine(name));

    //name es mi estado local yo voy a ir guardando lo que esta tipeando el usuario
    setName(""); // en mi estado local name enconces lo que yo tengo en mi estado local va  a llegarla a mi accion
    //que va a llamar al back y le va a pasar (name) que es lo que esta escribiendo el usuario
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  }

  return (
      <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  value={name}
                  onChange={(event) => handleInputChange(event)}
                  onKeyPress={(event) => handleKeyPress(event)}
                  aria-label="Search"
                  style={{ maxWidth: 400 }}
                  />
                <Button onClick={(event) => handleSubmit(event)} variant="outline-success">Search</Button>
              </Form> 
  );
}
