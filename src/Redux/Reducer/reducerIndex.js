import { toast } from "react-toastify";
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
  GET_USERS,
  UPDATE_ITEM_QUANTITY,
} from "../Actions/actionsTypes.js";

export const initialState = {
  wines: [],
  cart: [],
  user: {},
  total: 0,
  allUsers: [],
  allOrders: [],
  userReviews: [],
  allRatedProducts: [],
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
        allOrders: payload,
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
      const productToAdd = state.wines.find(
        (product) => product.id === payload
      );

      if (existingProduct) {
        // Si el producto ya existe en el carrito
        const maxQuantity = productToAdd.stock - existingProduct.quantity;
        if (maxQuantity <= 0) {
          // Si el stock disponible es cero o negativo, mostrar un mensaje de toast y no realizar ninguna modificación adicional
          toast.error("There is no stock available for this product.", {
            position: toast.POSITION.TOP_CENTER_RIGHT,
          });
          return state;
        }

        // Actualizar la cantidad en el carrito
        const quantityToAdd = 1;
        const updatedCart = state.cart.map((product) => {
          if (product.id === payload) {
            return {
              ...product,
              quantity: product.quantity + quantityToAdd,
            };
          }
          return product;
        });

        toast.success("Product added to cart.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        // Si el producto no existe en el carrito y el stock es mayor a cero, agregarlo con una cantidad inicial de 1
        if (productToAdd.stock <= 0) {
          // Si el stock es cero o negativo, mostrar un mensaje de toast y no agregar al carrito
          toast.error("There is no stock available for this product.", {
            position: toast.POSITION.TOP_CENTER,
          });
          return state;
        }

        productToAdd.quantity = 1;

        toast.success("Product added to cart.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        return {
          ...state,
          cart: [...state.cart, productToAdd],
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
    case GET_USERS: {
      return {
        ...state,
        allUsers: payload,
      };
    }

    case UPDATE_ITEM_QUANTITY: {
      const { productId, quantity } = payload;
      const productToUpdate = state.cart.find(
        (product) => product.id === productId
      );

      if (!productToUpdate) {
        return state;
      }

      const updatedCart = state.cart
        .map((product) => {
          if (product.id === productId) {
            const newQuantity = product.quantity + quantity;

            // Verificar si hay suficiente stock
            if (newQuantity <= 0) {
              // Eliminar el producto del carrito si la cantidad es cero o negativa
              return null;
            } else if (newQuantity > product.stock) {
              // Mostrar una alerta de que no hay suficiente stock
              toast.error("There is no stock available for this product.", {
                position: toast.POSITION.TOP_CENTER,
              });
              return product; // No actualizar la cantidad si no hay suficiente stock
            }

            return {
              ...product,
              quantity: newQuantity,
            };
          }
          return product;
        })
        .filter(Boolean); // Eliminar los productos nulos del carrito

      const newTotal = updatedCart.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      );

      return {
        ...state,
        cart: updatedCart,
        total: newTotal,
      };
    }
    default:
      return initialState;
  }
}

export default reducerIndex;
