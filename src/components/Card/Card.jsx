import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useEffect, useState } from "react";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartS } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";
// import { postFavorite, deleteFavorites } from "../../redux/actions/actionIndex";

// import { addToCart } from "../../Redux/Actions/actionsIndex.js";

export default function Card({
  name,
  image,
  price,
  id,
  origin,
  stock,
  banned,
  category,
}) {
  // const dispatch = useDispatch();

  const deshabilitado = stock === 0 || banned === true;


  // const handleAddToCart = () => {
  //   const product = { id, name, image, price };
  //   console.log(product);
  //   dispatch(addToCart(product));
  //   toast.success("Your product has been added to your cart!", {
  //     position: toast.POSITION.BOTTOM_RIGHT,
  //   });
  // };

  return (
    // <div className={styles.contCard}>
    //   <Link to={`/detail/${id}`}>
    //     <div className={styles.name}>
    //       {name[0].toUpperCase() + name.slice(1)}
    //     </div>
    //     <img src={image} alt="Card thumbnail" className={styles.image}></img>
    //     <div className={styles.price}>{"$" + price}</div>
    //     <div className={styles.origin}>{origin}</div>
    //   </Link>
    //   <button className={styles.addtocart} onClick={handleAddToCart}>
    //     Add to Cart
    //   </button>
    // </div>


    <div style={{boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)'}} key={id} className={`${styles.card__container} ${deshabilitado ? styles.disabled : ''}`} >

    <div
      style={{ boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)" }}
      key={id}
      className={`${styles.card__container} ${
        deshabilitado ? styles.disabled : ""
      }`}
    >

      <Link to={`/detail/${id}`} className={styles.card_link}>
        <div>
          <img src={image} alt={name} />
        </div>

        <hr className='text-secondary mt-2' />

        <hr className="text-secondary mt-2" />

        <div className={styles.card__text}>
          <h1>{name}</h1>
          <p>{origin}</p>
          <p>{category}</p>
          <h4>${price}</h4>
        </div>
      </Link>


      {/* <button className={styles.addtocart} onClick={handleAddToCart}>
        Add to Cart
      </button> */}

    </div>
  );
}
