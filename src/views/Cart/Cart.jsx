import { useDispatch, useSelector } from "react-redux";
import style from "../Cart/Cart.module.css";
import React from "react";
import {
  removeFromCart,
  clearCart,
  sumCartValues,
} from "../../Redux/Actions/actionsIndex";
import axios from "axios";

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

  const handleBuy = async () => {
    // Simulate a purchase by displaying an alert with the total price
    const items = cart.map((items) => {
      return {
        id: cart.id,
        title: cart.name,
        picture_url: cart.image,
        description: cart.category,
        unit_price: cart.price,
        category_id: "others",
        quantity: cart.price,
      };
    });
    const payment = {
      items,
      payer: {
        name: "Alejandro",
        surname: "Medina",
        email: "ale_m@outlook.com",
      },
    };
    try {
      const response = await axios.post("/payment", payment);
      window.location.href = response.data;
      handleClearCart();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={style.mainCart}>
      <h2>
        <u>Shopping Cart</u>
      </h2>
      <button onClick={handleSumCartValues}>Calculate total </button>

      {cart.length > 0 && (
        <div className={style.totalPrice}>
          <span>
            {" "}
            •
            <u>
              <b>Total:</b>
            </u>
            ${total}
          </span>
          <button className={style.buy_button} onClick={handleBuy}>
            Buy
          </button>
        </div>
      )}

      {cart.length === 0 ? (
        <p>There are no products in the cart!</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <div key={item.id} className={style.contCard}>
              <div className={style.imageContainer}>
                <img src={item.image} alt="image card" />
                <p className={style.name}>{item.name}</p>
                <p className={style.price}>{"$" + " " + item.price}</p>
              </div>
              <button
                className={style.delete_button}
                onClick={() => handleRemoveFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </ul>
      )}
      <button className={style.delete_button} onClick={handleClearCart}>
        Remove All Products
      </button>
    </div>
  );
};

export default Cart;
