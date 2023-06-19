/* eslint-disable import/no-anonymous-default-export */
import { applyMiddleware, createStore, compose } from "redux";
import reducer from "../Reducer/reducerIndex.js";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "state",
  storage,
  
};

const persistedReducer = persistReducer(persistConfig, reducer);

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export default () => {
  let store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  let persistor = persistStore(store);
  return { store, persistor };
};

// const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

// export default store;
