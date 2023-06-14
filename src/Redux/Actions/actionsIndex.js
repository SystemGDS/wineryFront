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
  SUM_CART_VALUES
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
      const json = await axios.get("http://localhost:3001/wines?name=" + name);
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

////////////////////////**REVIEW**/////////////////////////

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
export const addToCart = (id) => ({
  type: ADD_TO_CART,
  payload: id,
});

export const removeFromCart = (productId) => ({
  type: DELETE_PRODUCT_FROM_CART,
  payload: productId,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const sumCartValues = () => ({
  type: SUM_CART_VALUES,
});
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
