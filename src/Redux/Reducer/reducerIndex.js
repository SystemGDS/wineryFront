import {
  GET_REVIEW_BY_ID,
  GET_WINES,
  GET_NAME_WINE,
  CREATE_WINE,
  ADD_TO_CART,
  DELETE_PRODUCT_FROM_CART,
  CLEAR_CART,
  SUM_CART_VALUES,
  USER_BY_EMAIL,
  GET_ORDERS,
  PUT_PRODUCT_STATE,
  GET_PRODUCTS,
  CREATE_PRODUCTS,
  CREATE_CATEGORY,
} from "../Actions/actionsTypes.js";

export const initialState = {
  wines: [],
  cart: [],
  user: {},
  total: 0,
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
    case GET_ORDERS:
      return {
        ...state,
        wines: payload,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        allProducts: payload,
        filterProducts: payload,
        orderedChange: !state.orderedChange,
      };
    case CREATE_PRODUCTS:
      return {
        ...state,
        allProducts: [...state.allProducts, payload],
      };
    case CREATE_CATEGORY:
      return {
        ...state,
        allCategories: [...state.allCategories, payload],
      };
    case CREATE_WINE:
      return {
        ...state,
        wines: payload,
      };
    case PUT_PRODUCT_STATE:
      return {
        ...state,
        wines: payload,
      };
    //case ADD_TO_CART: {
    //const newProduct = state.wines.find((product) => product.id === payload);
    //const newCart = [...state.cart, newProduct];
    //return {
    // ...state,
    //cart: newCart,
    //};
    //}
    case ADD_TO_CART: {
      const existingProduct = state.cart.find(
        (product) => product.id === payload
      );

      if (existingProduct) {
        // Si el producto ya existe en el carrito
        if (existingProduct.quantity >= 10) {
          // Si se alcanzó el límite máximo, no se realiza ninguna modificación adicional
          return state;
        }

        // Si no se ha alcanzado el límite máximo, incrementar la cantidad
        const updatedCart = state.cart.map((product) => {
          if (product.id === payload) {
            return {
              ...product,
              quantity: product.quantity + 1,
            };
          }
          return product;
        });

        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        // Si el producto no existe en el carrito, agregarlo con una cantidad inicial de 1
        const newProduct = state.wines.find(
          (product) => product.id === payload
        );
        newProduct.quantity = 1;

        return {
          ...state,
          cart: [...state.cart, newProduct],
        };
      }
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
    case SUM_CART_VALUES: {
      const total = state.cart.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      );
      return {
        ...state,
        total: total,
      };
    }
    // se trae el user por email
    case USER_BY_EMAIL: {
      console.log(payload);
      return {
        ...state,
        user: payload,
      };
    }

    default:
      return initialState;
  }
}

export default reducerIndex;
