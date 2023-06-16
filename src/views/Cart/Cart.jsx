/* eslint-disable no-useless-concat */
/* eslint-disable jsx-a11y/img-redundant-alt */
//import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import style from "../Cart/Cart.module.css";
import React from "react";
import { removeFromCart, clearCart,sumCartValues } from "../../Redux/Actions/actionsIndex";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const total = useSelector((state) => state.total);

  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const handleSumCartValues = () => {
    dispatch(sumCartValues());
  };
  const handleBuy = () => {
    // Simulate a purchase by displaying an alert with the total price
    alert(`Compra realizada por un total de $${total}`);
  };
  

  

  return (
    <div className={style.mainCart}>
      <h2>Carrito de compras</h2>
      <button onClick={handleSumCartValues}>Calcular total del carrito</button>

      {cart.length > 0 && (
        <div className={style.totalPrice}>
          <span>Total: ${total}</span>
          <button className={style.buy_button} onClick={handleBuy}>Comprar</button>
        </div>
      )}

      {cart.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <div key={item.id} className={style.contCard}>
              <div className={style.imageContainer} >
                <img src={item.image} alt="image card" />
                <p className={style.name}>{item.name}</p> 
                <p className={style.price}>{"$" + " " + item.price}</p>
              </div>
              <button className={style.delete_button} onClick={() => handleRemoveFromCart(item.id)}>
                Eliminar
              </button>
            </div>
          ))}
        </ul>
      )}
      <button className={style.delete_button} onClick={handleClearCart}>Eliminar todos</button>
    </div>
  );
};

export default Cart;
