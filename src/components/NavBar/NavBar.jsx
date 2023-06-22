/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
// import { faHome } from "@fortawesome/free-solid-svg-icons";
import LogInButton from "../LoginButton/LoginButton";
import s from "./NavBar.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { saveUserinDB } from "../../helpers/saveUserinDB.js";
import BurgerMenu from "./Burguer";
// import Admin from "../../views/Dashboard/DashboardContainer"

// import Button from 'react-bootstrap/Button';

import Container from "react-bootstrap/Container";
// import Form from 'react-bootstrap/Form';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useLocation } from "react-router-dom";
import SerchBar from "../SearchBar/SearchBar";
import "./stylenav.css"
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NavBar = () => {
  const [usuario, setUsuario] = useState(null);

  const { isAuthenticated, user, logout } = useAuth0();

  useEffect(()=>{
    const dad = async () =>{
      isAuthenticated && saveUserinDB(user);
      const storedUsuario = localStorage.getItem("usuario");
      if (storedUsuario) {
        const parsedUsuario = JSON.parse(storedUsuario);
        setUsuario(parsedUsuario);
      }
    }
    dad()
  },[user])


  useEffect(() => {
    if (usuario && usuario.banned) {
      localStorage.setItem("usuario", JSON.stringify(""));
      logout({ returnTo: window.location.origin + "/" })

      toast.warn('Your account has been suspended. For more details, please contact our support team.', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  },[usuario])

//   const { isAuthenticated, user, logout } = useAuth0();
  
//   useEffect(() => {
//     isAuthenticated && saveUserinDB(user);
//     const storedUsuario = localStorage.getItem("usuario");
//     if (storedUsuario) {
//       const parsedUsuario = JSON.parse(storedUsuario);
//       console.log(parsedUsuario)
//       if(parsedUsuario.banned){
//         toast.warn('Your account has been suspended. For more details, please contact our support team.', {
//           position: "top-right",
//           autoClose: 4000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//           });
//         logout({ returnTo: window.location.origin + "/" })
//       }
//       else setUsuario(parsedUsuario);
//     }
   

//   }, [user]);


  const location = useLocation()
 
  return (
    <div>
      <ToastContainer/>
      <div>
        <Navbar  bg="dark" data-bs-theme="dark">
          <Container  className=".navbar" fluid>
              <Nav className="d-flex align-items-center " style={{ maxHeight: '150px' }} >
              <Link to="/" className="p-1 text-decoration-none "><Navbar.Brand className="fs-3 ">Henry winery</Navbar.Brand></Link>
                <Link to="/shop" className="nav-link ml-2 mr-2 text-white" >Shop</Link>
                <Link to="/about" className="nav-link ml-2 mr-2 text-white">About us</Link>
                <Link to="/contact" className="nav-link ml-2 mr-2 text-white">Contact us</Link>
              </Nav>
              <Nav style={{maxWidth:400}}>
              {
                location.pathname == "/shop" ?
                <SerchBar/>
              // "aca va el <searchbar>"
              : null
              
              }
              </Nav>
              <Nav className="d-flex align-items-center ">
              {
               isAuthenticated && usuario?.isAdmin
               ? <Link to="/admin/users" className="nav-link ml-2 mr-2 text-white" >Dashboard</Link>
               : null
              }
              {/* <Link to="/" className="nav-link ml-2 mr-2 text-white" ><i className="bi bi-heart-fill fs-5"></i></Link> */}
              <Link to="/cart" className="nav-link ml-2 mr-2 text-white" ><i className="bi bi-cart3 fs-4"></i></Link>
              {/* <Link to="/admin/users" className="navbar-brand" ><i className="bi bi-box-arrow-right fs-4"></i></Link> */}
              {

                isAuthenticated 
                ? (
                  <div className={s.userName}>
                        {" "}
                        Hi, {user.nickname}!
                        <BurgerMenu />
                       </div>
                )
                : <LogInButton />
              }
              </Nav>

          </Container>
        </Navbar>
      </div>
    </div>
  );
};

export default NavBar;
