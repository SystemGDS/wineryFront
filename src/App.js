import React from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import UserComponent from "./views/User/UserComponent";
import NavBar from "./components/NavBar/NavBar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./views/Home/Home.jsx";
import WineDetail from "./views/Detail/WineDetail.jsx";
import Contact from "./components/ContactForm/Contact.jsx";
import Shop from "./views/Shop/Shop.jsx";
import About from "./views/About/About.jsx";
import Cart from "./views/Cart/Cart.jsx";
import Cargar from "./components/LoaderImage/imgbbImageLoader";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "./components/Loader/Loader";
import { ProtectedRouter } from "./components/ProtectedRouter/ProtectedRouter.jsx";
import Payments from "./views/Dashboard/Payments";
import User from "./views/Dashboard/User";
import Wines from "./views/Dashboard/Wines";
import NewWine from "./views/Dashboard/NewWine";

axios.defaults.baseURL = "http://localhost:3001";
// axios.defaults.baseURL = "https://wineryback-production.up.railway.app"
//axios.defaults.baseURL = "https://wineryback-production.up.railway.app" || "http://localhost:3001";

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
        <Route path="/admin/users" element={<User />} />
        <Route path="/admin/payments" element={<Payments />} />
        <Route path="/admin/wines" element={<Wines />} />
        <Route path="/admin/newwine" element={<NewWine />} />

        <Route path="/uploader" element={<Cargar />} />

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
