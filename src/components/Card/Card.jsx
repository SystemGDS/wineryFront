/* eslint-disable no-useless-concat */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/Actions/actionsIndex.js';
export default function Card({ name, image, price, id, origin}) {

  //aca me traigo las propiedades

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const product = ( id, name, image, price) ;
    dispatch(addToCart(product));
  };


  return (
      <div className={styles.contCard}>
    <Link to={`/detail/${id}`} >
      <div className={styles.name}>{name[0].toUpperCase() + name.slice(1)}</div>
      <img src={image} alt="image card" className={styles.image}></img>
      <div className={styles.price}>{"$" + " " + price}</div>
      <div className={styles.origin}>{origin}</div>
      </Link>
      <button onClick={handleAddToCart}>Agregar al carrito</button>
    </div>
  );
}
