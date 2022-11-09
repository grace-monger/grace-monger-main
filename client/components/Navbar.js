import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ isLoggedIn }) => {
  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <div>
      <img
        src="cheeseLogo.png"
        height="100px"
        width="100px"
        className="cheeseLogo"
      ></img>
      <h1>Grace Monger</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <ul>
            {/* The navbar will show these links before you log in */}
            <Link to="/">Home</Link>
            <Link to="/cheeses">Cheese</Link>
            <Link to="/wines">Wine</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <i class="bi bi-search-heart"></i>
            <i class="bi bi-person"></i>
            <i class="bi bi-cart4"></i>
          </ul>
        )}
      </nav>
      <hr />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapState, mapDispatch)(Navbar);
