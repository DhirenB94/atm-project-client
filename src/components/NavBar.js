import React from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../api";
import './navbar.css'

function Navbar({ loggedInUser, setCurrentUser }) {
  const logoutUser = async () => {
    await logout(); //kills session on backend
    setCurrentUser(null); //sets user to null on front
  };

  return loggedInUser ? (
    <div className= "nav">
      <NavLink exact to = "/">
          <img src="../atm-logo.png" className="logo" />
        </NavLink>
      <p>Welcome {loggedInUser.username}</p>
      <NavLink exact to="/">
        <button onClick={logoutUser} className="logout-btn">Logout</button>
      </NavLink>
    </div>
  ) : (
      <div className= "nav">
        <NavLink exact to = "/">
          <img src="../atm-logo.png" className="logo" />
        </NavLink>
        <NavLink activeStyle={{ color: "white" }} exact to="/signup">
          Signup
        </NavLink>

        <NavLink activeStyle={{ color: "white" }} exact to="/login">
          Login
        </NavLink>
        <NavLink activeStyle={{ color: "white" }} exact to="/login-google">
          Google Login
        </NavLink>
    </div>
  )

}
export default Navbar;
