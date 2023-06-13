// import { useState, cloneElement } from "react";
// import s from "../NavBar/Burguer.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars } from "@fortawesome/free-solid-svg-icons";
// import LogoutButton from "../LogOutButton/LogOutButton.jsx";
// import { Link } from "react-router-dom";

// export default function BurgerMenu() {
//   const [open, setOpen] = useState(false);

//   const handleOpen = () => {
//     setOpen(!open);
//   };

//   const handleMenuOne = () => {
//     setOpen(false);
//   };

//   const handleMenuTwo = () => {
//     setOpen(false);
//   };

//   return (
//     <Dropdown
//       open={open}
//       trigger={
//         <FontAwesomeIcon
//           icon={faBars}
//           className={s.icon}
//           onClick={handleOpen}
//           alt="Menu icon"
//         />
//       }
//       menu={[
//         <button onClick={handleMenuOne} key="menuOne">
//           <Link to="/user">My Account</Link>
//         </button>,
//         <div className={s.logout} key="menuTwo">
//           <LogoutButton onClick={handleMenuTwo} />
//         </div>,
//       ]}
//     />
//   );
// }

// const Dropdown = ({ trigger, menu }) => {
//   const [open, setOpen] = useState(false);

//   const handleOpen = () => {
//     setOpen(!open);
//   };

//   return (
//     <div className={s.dropdown}>
//       {cloneElement(trigger, {
//         onClick: handleOpen,
//       })}
//       {open && (
//         <ul className={s.menu}>
//           {menu.map((menuItem, index) => (
//             <li key={index} className={s.menuItem}>
//               {cloneElement(menuItem, {
//                 onClick: () => {
//                   menuItem.props.onClick();
//                   setOpen(false);
//                 },
//               })}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };
