import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameWine } from "../../Redux/Actions/actionsIndex";
import styles from "./SearchBar.module.css";
import buscar from "../../img/buscar.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  return (
    <div className={styles.shopBackground}>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search wine..."
          onChange={(event) => handleInputChange(event)}
          className={styles.input}
          value={name}
        />

        <button
          type="submit"
          onClick={(event) => handleSubmit(event)}
          className={styles.searchButton}
        >
          <img src={buscar} alt="buscar" className={styles.buscar}></img>
        </button>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  );
}
