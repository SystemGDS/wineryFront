import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import execute from "./Redux/Store/storeIndex";
import { Auth0Provider } from "@auth0/auth0-react";
import { PersistGate } from "redux-persist/integration/react";

const { store, persistor } = execute();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    clientId={process.env.REACT_APP_CLIENT_ID}
    domain={process.env.REACT_APP_DOMAIN}
  >
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
