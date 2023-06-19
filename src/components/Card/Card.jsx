/* eslint-disable no-useless-concat */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/Actions/actionsIndex.js";
import { toast } from "react-toastify";

export default function Card({ name, image, price, id, origin }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const product = { id, name, image, price };
    console.log(product);
    dispatch(addToCart(product));
    toast.success("Your product has been added to your cart!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  return (
    <div className={styles.contCard}>
      <Link to={`/detail/${id}`}>
        <div className={styles.name}>
          {name[0].toUpperCase() + name.slice(1)}
        </div>
        <img src={image} alt="Card thumbnail" className={styles.image}></img>
        <div className={styles.price}>{"$" + price}</div>
        <div className={styles.origin}>{origin}</div>
      </Link>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
