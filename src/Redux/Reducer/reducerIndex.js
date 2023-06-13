import {
  GET_REVIEW_BY_ID,
  GET_WINES,
  GET_NAME_WINE,
  CREATE_WINE,
  ADD_TO_CART,
  DELETE_PRODUCT_FROM_CART,
  CLEAR_CART,
} from "../Actions/actionsTypes.js";

export const initialState = {
  wines: [],
  cart: [],
  user: {},
};

function reducerIndex(state = initialState, { type, payload }) {
  switch (type) {
    case GET_REVIEW_BY_ID: {
      return {
        ...state,
        productReview: payload,
      };
    }
    case GET_WINES:
      return {
        ...state,
        wines: payload,
      };
    case GET_NAME_WINE:
      return {
        ...state,
        wines: payload,
      };
    case CREATE_WINE:
      return {
        ...state,
        wines: payload,
      };
    case ADD_TO_CART: {
      const newProduct = state.wines.find((product) => product.id === payload);
      const newCart = [...state.cart, newProduct];
      return {
        ...state,
        cart: newCart,
      };
    }
    case DELETE_PRODUCT_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter((product) => product.id !== payload),
      };
    }
    case CLEAR_CART: {
      return initialState;
    }
    // Vaciar el carrito

    default:
      return initialState;
  }
}

export default reducerIndex;
