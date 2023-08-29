import "./navbar.css";

import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);

  const handleClick = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Booking Website</span>
        </Link>
        {user ? (
          <div className="navItems">
            {user.username}
            <Link to="/transaction">
              <button className="navButton">Transactions</button>
            </Link>
            <Link to="/">
              <button className="navButton" onClick={handleClick}>
                Logout
              </button>
            </Link>
          </div>
        ) : (
          <div className="navItems">
            <Link to="/register">
              <button className="navButton">Register</button>
            </Link>
            <Link to="/login">
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
