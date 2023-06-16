import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutIcon from "@mui/icons-material/Logout";

const LogOutButton = ({ className }) => {
  const { logout } = useAuth0();
  return (
    <LogoutIcon
      className={className}
      onClick={() => logout({ returnTo: "http://localhost:3000/" })}
    />
  );
};

export default LogOutButton;
