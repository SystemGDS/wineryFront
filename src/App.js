import React from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "./components/Loader/Loader";
import { ProtectedRouter } from "./components/ProtectedRouter/ProtectedRouter.jsx";
import UserComponent from "./views/User/UserComponent";

import NavBar from "./components/NavBar/NavBar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./views/Home/Home.jsx";
import WineDetail from "./views/Detail/WineDetail.jsx";
import Contact from "./components/ContactForm/Contact.jsx";
import Shop from "./views/Shop/Shop.jsx";
import About from "./views/About/About.jsx";
import Cart from "./views/Cart/Cart.jsx";
import Admin from "./layouts/Dashboard/Dashboard.js";
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.baseURL =
  /*  "https://wineryback-production.up.railway.app" || */ "http://localhost:3001";

export default function App() {
  const { isLoading, isAuthenticated } = useAuth0();
  const location = useLocation();

  if (isLoading) return <Loader />;

  const shouldRenderNavBarAndFooter = location.pathname !== "/users";

  return (
    <div>
      {shouldRenderNavBarAndFooter && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<WineDetail />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<Admin />} />
        <Route element={<ProtectedRouter isAuthenticated={isAuthenticated} />}>
          <Route
            path="/users"
            element={
              <ProtectedRouter
                isAuthenticated={isAuthenticated}
                children={<UserComponent />}
              />
            }
          />
          {/* Aquí van las rutas protegidas. La estructura es la misma. Ejemplo: <Route path="/checkout" element={<Checkout /> } /> */}
        </Route>
      </Routes>
      {shouldRenderNavBarAndFooter && <Footer />}
    </div>
  );
}
