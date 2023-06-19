import { useState, cloneElement } from "react";
import s from "../NavBar/Burguer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import LogoutButton from "../LogOutButton/LogOutButton";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
export default function BurgerMenu() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleMenuOne = () => {
    setOpen(false);
  };

  const handleLogOut = () => {
    setOpen(false);
    navigate("/");
  };

  return (
    <Dropdown
      open={open}
      trigger={
        <FontAwesomeIcon
          icon={faBars}
          className={s.icon}
          onClick={handleOpen}
          alt="Menu icon"
        />
      }
      menu={[
        <button onClick={handleMenuOne} key="menuOne">
          <Link to="/users">
            <div className={s.userprofile}>
              <AccountCircleIcon fontSize="large" />
            </div>
          </Link>
        </button>,
        <div className={s.logout} key="menuTwo">
          <LogoutButton onClick={handleLogOut} />
        </div>,
      ]}
    />
  );
}

const Dropdown = ({ trigger, menu }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={s.dropdown}>
      {cloneElement(trigger, {
        onClick: handleOpen,
      })}
      {open && (
        <ul className={s.menu}>
          {menu.map((menuItem, index) => (
            <li key={index} className={s.menuItem}>
              {cloneElement(menuItem, {
                handleLogOut: () => {
                  menuItem.props.handleLogOut();
                  setOpen(false);
                },
              })}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
