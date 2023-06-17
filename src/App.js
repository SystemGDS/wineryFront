import "./App.css";
import NavBar from "./components/NavBar/NavBar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./views/Home/Home.jsx";
import { Route, Routes } from "react-router-dom";
import WineDetail from "./views/Detail/WineDetail.jsx";
import Contact from "./components/ContactForm/Contact.jsx";
import Shop from "./views/Shop/Shop.jsx";
import About from "./views/About/About.jsx";
import Cart from "./views/Cart/Cart.jsx";
import Admin from "./layouts/Dashboard/Dashboard.js";
import Cargar from "./components/LoaderImage/imgbbImageLoader";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "./components/Loader/Loader";
import { ProtectedRouter } from "./components/ProtectedRouter/ProtectedRouter.jsx";

// axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.baseURL =
  "https://wineryback-production.up.railway.app" || "http://localhost:3001";

export default function App() {
  const { isLoading, isAuthenticated } = useAuth0();
  if (isLoading) return <Loader />;

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<WineDetail />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/uploader" element={<Cargar />} />

        <Route element={<ProtectedRouter isAuthenticated={isAuthenticated} />}>
          {/* Aquí van las rutas protegidas. La estructura es la misma.Ejemplo:        <Route path="/checkout" element={<Checkout /> } />         */}
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}
