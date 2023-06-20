import { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { saveUserinDB } from "../../helpers/saveUserinDB.js";

//import style from "../Reviews/Reviews.module.css";

export default function UserReview() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  console.log("consolel log del rating", rating);
  console.log("consolel log del rating", review);

  // const user = useDispatch((store) => store.user);

  // useEffect(() => {
  //   const getUsersFromBack = async () => {
  //     const response = await fetch("http://localhost:3001/email", {
  //       method: "GET",
  //       //body: JSON.stringify({ email: user.email }),
  //     });
  //     const data = await response.json();
  //     console.log(
  //       "========================================este es el consolelog del data de POSTuser",
  //       data
  //     );
  //   };
  //   getUsersFromBack();
  // }, []);

  const handleRatingChange = (event, value) => {
    setRating(value);
  };

  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    isAuthenticated && saveUserinDB(user);
    console.log(
      "======================este es el console log del useeffect del saveUser=============================",
      user
    );
  }, [user]);

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = () => {
    // Aquí puedes realizar la lógica para enviar la calificación y reseña a la base de datos

    // Verificar si los campos obligatorios están completos
    if (!rating || !review) {
      toast.error("Please provide a rating and a review.");
      return;
    }

    // Ejemplo de solicitud POST utilizando axios
    const data = {
      userId: user.id, // Reemplaza con el ID de usuario actual
      wineId: 456, // Reemplaza con el ID del producto actual
      comment: review,
      stars: rating,
    };

    axios
      .post("/api/reviews", data)
      .then((response) => {
        // Manejo de la respuesta de éxito de la solicitud
        toast.success("Review submitted successfully!");
        // Restablecer los valores del estado después de enviar la reseña
        setRating(0);
        setReview("");
      })
      .catch((error) => {
        // Manejo de errores en caso de que la solicitud falle
        toast.error("Failed to submit review.");
        console.error(error);
      });
  };

  return (
    <div>
      <div>
        <div>
          <span>
            •<u> Review:</u>
          </span>{" "}
          <Rating
            name="RateReview"
            value={rating}
            onChange={handleRatingChange}
          />
          <p>Your review is {rating} stars.</p>
        </div>

        <textarea
          value={review}
          onChange={handleReviewChange}
          placeholder="Rate this product!"
          type="textarea"
          rows={5}
          cols={5}
          maxLength="100"
        ></textarea>

        <button onClick={handleSubmit}>Qualify</button>
      </div>
    </div>
  );
}

//cambiando para el commit
