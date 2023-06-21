/* eslint-disable no-unused-vars */
//imports correpondientes
import axios from "axios";
import { toast } from "react-toastify";
import {
  GET_WINES,
  GET_NAME_WINE,
  CREATE_WINE,
  GET_REVIEW_BY_ID,
  ADD_TO_CART,
  DELETE_PRODUCT_FROM_CART,
  CLEAR_CART,
  SEND_TO_CART,
  SUM_CART_VALUES,
  DELETE_FAVORITES,
  GET_USER_REVIEWS,
  UPDATE_USER,
  USER_BY_EMAIL,
  GET_ORDERS,
  PUT_PRODUCT_STATE,
  GET_PRODUCTS,
  GET_FAVORITES,
  GET_USERS,
  POST_REVIEW,
} from "./actionsTypes.js";

export function getWines() {
  return async function (dispatch) {
    try {
      const json = await axios.get(`/wines`);
      return dispatch({
        type: GET_WINES,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: GET_WINES,
        payload: error,
      });
    }
  };
}
export function getNameWine(name) {
  //se puede llamar name o payload
  return async function (dispatch) {
    try {
      // http://localhost:3001
      const json = await axios.get("/wines?name=" + name);
      console.log(json.data);
      return dispatch({
        type: GET_NAME_WINE,
        payload: json.data, //esto me devuelve la accion y json.data lo que va a hacer es que cuando busquemos por name en la barra
        //de busqueda devuelva lo que devuelva la ruta por name una ves asignado
      });
    } catch (error) {
      toast("🍷 Wine not found!");
    }
  };
}
export function getFiltersWine(checkedItems, select, name) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        `/wines?category=${checkedItems.join(
          ","
        )}&origin=${select}&name=${name}`
      );

      return dispatch({
        type: GET_WINES,
        payload: json.data,
      });
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data) {
        console.log(error.response.data);
        return dispatch({
          type: GET_WINES,
          payload: [],
        });
      }
    }
  };
}
export function createWine(wineData) {
  return async function (dispatch) {
    try {
      const response = await axios.post("/wines", wineData);

      return dispatch({
        type: CREATE_WINE,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };
}

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product.id,
});

export const removeFromCart = (productId) => ({
  type: DELETE_PRODUCT_FROM_CART,
  payload: productId,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const sumCartValues = () => {
  return {
    type: SUM_CART_VALUES,
  };
};
////////////////////////**CART**/////////////////////////

export const sendToCart = (payload) => {
  return async function (dispatch) {
    try {
      const response = await axios.put("/users/cart", payload);
      dispatch({ type: SEND_TO_CART, payload: response.data });
    } catch (error) {
      return "Failed to add to cart";
    }
  };
};

////////////////////////**User Component**/////////////////////////
export function filterUsersByEmail(email) {
  return async function (dispatch) {
    try {
      await axios.get("/users").then((res) => {
        let user = res.data.find((user) => user.email === email);
        dispatch({ type: USER_BY_EMAIL, payload: user });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateUser(payload) {
  return async function () {
    console.log(payload);
    try {
      await axios.put("/users", payload).then((data) => {
        console.log(data);
      });
    } catch (error) {
      toast.error("Your profile could not be updated, please try again later");
      console.error(error.message);
    }
  };
}

export const getUserReviews = (payload) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`/reviews/${payload}`);
      dispatch({ type: GET_USER_REVIEWS, payload: res.data });
    } catch (error) {
      return "Error";
    }
  };
};

export const getOrders = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/users/orders`);
      dispatch({ type: GET_ORDERS, payload: response.data });
    } catch (error) {
      return "Order not found";
    }
  };
};

export function deleteFavorites(payload) {
  return async function (dispatch) {
    dispatch({
      type: DELETE_FAVORITES,
      payload: payload,
    });
    try {
      const response = await axios.delete("/favorites", { data: payload });
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}

export const putProductState = ({ name, activeProduct }) => {
  return async function (dispatch) {
    try {
      const adminRes = await axios.put("/products", { name, activeProduct });

      dispatch({
        type: PUT_PRODUCT_STATE,
        payload: activeProduct,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export function getFavorites(email) {
  return async function (dispatch) {
    try {
      const productsResponse = await axios.get(`/favorites/${email}`);
      dispatch({ type: GET_FAVORITES, payload: productsResponse.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export const getProducts = () => {
  return async function (dispatch) {
    const productsResponse = await axios.get("/products");
    dispatch({ type: GET_PRODUCTS, payload: productsResponse.data });
  };
};

export const getUsers = () => {
  return async function (dispatch) {
    const users = (await axios.get("/users")).data;
    return dispatch({ type: GET_USERS, payload: users });
  };
};

////////////////////////////////////////////////ACTIONS PARA LOS REVIEWS///////////////////////////////////

export function postReview(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post("/reviews", payload);
      return dispatch({
        type: POST_REVIEW,
        payload: response.data,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
}

export const getReviewById = (payload) => {
  return async function (dispatch) {
    try {
      const respose = await axios.get(`/reviews/?productId=${payload}`);
      dispatch({ type: GET_REVIEW_BY_ID, payload: respose.data });
    } catch (error) {
      return "Review not found";
    }
  };
};
