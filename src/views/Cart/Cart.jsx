/* eslint-disable no-useless-concat */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { useDispatch, useSelector } from "react-redux";
import style from "../Cart/Cart.module.css";
import React from "react";
import { useEffect } from "react";
import {
  removeFromCart,
  clearCart,
  sumCartValues,
  updateItemQuantity,
} from "../../Redux/Actions/actionsIndex";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const total = useSelector((state) => state.total);
  const { isAuthenticated, user } = useAuth0();

  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));

    if (cart.length > 1) {
      toast.info("Product has been removed from the cart.");
    } else if (cart.length === 1) {
      toast.info("Last product has been removed from the cart.");
    } else {
    }
  };

  const handleClearCart = () => {
    if (cart.length === 0) {
      return; // No haces nada si el carrito ya está vacío
    }

    dispatch(clearCart());
    toast.info("Your cart has been emptied!");
  };

  useEffect(() => {
    const handleSumCartValues = () => {
      dispatch(sumCartValues());
    };

    handleSumCartValues();
  }, [dispatch]);

  const handleUpdateItemQuantity = (productId, quantity) => {
    dispatch(updateItemQuantity(productId, quantity));
  };

  const handleBuy = async () => {
    // Simulate a purchase by displaying an alert with the total price

    if (!isAuthenticated) {
      return toast.info("Register to continue shopping!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    const items = cart.map((items) => {
      return {
        id: items.id,
        title: items.name,
        picture_url: items.image,
        description: items.category,
        unit_price: items.price,
        category_id: "others",
        quantity: items.quantity,
      };
    });

    const payment = {
      items,
      payer: {
        name: user.given_name,
        surname: user.nickname,
        email: user.email,
      },
    };

    try {
      const response = await axios.post("/payment", payment);
      window.location.href = response.data;
      handleClearCart();
      console.log(payment);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={style.mainCart}>
      <ToastContainer />
      <h2>
        <u>Shopping Cart</u>
      </h2>

      {cart.length > 0 && (
        <div className={style.totalPrice}>
          <span>
            {" "}
            •{" "}
            <u>
              <b>Total:</b>
            </u>{" "}
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
                <img src={item.image} alt="" />
                <p className={style.name}>{item.name}</p>
                <p className={style.price}>{"$" + item.price}</p>
                <span>{item.quantity}&nbsp;unity</span>
                <button
                  className={style.buttonMenos}
                  onClick={() => handleUpdateItemQuantity(item.id, -1)}
                >
                  -
                </button>
                <button
                  className={style.buttonMas}
                  onClick={() => handleUpdateItemQuantity(item.id, 1)}
                >
                  +
                </button>
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
      <button
        className={`${style.delete_button} ${
          cart.length === 0 ? style.disabled_button : ""
        }`}
        onClick={handleClearCart}
        disabled={cart.length === 0}
      >
        Remove All Products
      </button>
    </div>
  );
};

export default Cart;
