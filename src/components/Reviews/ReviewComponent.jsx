/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
// import { saveUserinDB } from "../../helpers/saveUserinDB.js";

import styles from "./Reviews.module.css";

export default function UserReview({ wineId, detallesVino }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [userHasReviews, setUserHasReviews] = useState(false);

  const { isAuthenticated, user } = useAuth0();

  const handleRatingChange = (event, value) => {
    setRating(value);
  };

  async function action(){
    try {
      const response = await fetch(`https://wineryback-production.up.railway.app/users/review/${user.email}/${wineId}`)
      // const response = await fetch(`http://localhost:3001/users/review/${user.email}/${wineId}`)
      const data = await response.json()
      if(data.error){
        console.log(data)
        setUserHasReviews(false)
        return
      }
      else{
        console.log(data)
        setUserHasReviews(true)
      }
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    action()
  }, [wineId]);

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
      userId: user.email, // Reemplaza con el ID de usuario actual
      wineId, // Reemplaza con el ID del producto actual
      comment: review,
      stars: rating,
    };

    axios
      .post("https://wineryback-production.up.railway.app/users/review", data)
      // .post("http://localhost:3001/users/review", data)
      .then((response) => {
        // Manejo de la respuesta de éxito de la solicitud
        toast.success("Review submitted successfully!");
        // Restablecer los valores del estado después de enviar la reseña
        setRating(0);
        setReview("");
      }).then(()=>{
        action();
        detallesVino()
      })
      .catch((error) => {
        // Manejo de errores en caso de que la solicitud falle
        toast.error("Failed to submit review.");
        console.error(error);
      });



  };
  if(!isAuthenticated) return

  return (
    <div className={`${userHasReviews ? styles.noShow : styles.backgroundReview} `}>
      <span>
        <u> Review:</u>
      </span>

        <>
          <Rating
            name="RateReview"
            value={rating}
            onChange={handleRatingChange}
          />

            <p>Your review is {rating} stars.</p>

            <textarea
              className={styles.textarea}
              value={review}
              onChange={handleReviewChange}
              placeholder="Rate this product!"
              type="textarea"
              rows={5}
              cols={5}
              maxLength="100"
            ></textarea>
    

          <button onClick={handleSubmit}>Qualify</button>
        </>
  
    </div>
  );
}
