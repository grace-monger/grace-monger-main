import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ isLoggedIn, isAdmin }) => {
  const handleClick = () => {
    logout();
  };

  return (
    <div className="nav-bar">
      <header className="header">
        <img
          src="cheeseLogo.png"
          height="100px"
          width="100px"
          className="cheeseLogo"
        ></img>
        <h1>Grace Monger</h1>
      </header>
      <div className="ticker-wrap">
        <div className="ticker">
          <div className="ticker__item">ALERT! NEW WINES!</div>
          <div className="ticker__item">Sean's Wines in Store Now!</div>
          <div className="ticker__item">ALERT! NEW WINES!</div>
          <div className="ticker__item">Sean's Wines in Store Now!</div>
          <div className="ticker__item">ALERT! NEW WINE!</div>
        </div>
      </div>
      <nav className="navigations">
        {isLoggedIn ? (
          <ul>
            {/* The navbar will show these links after you log in */}
            <Link to="/">Home</Link>
            <Link to="/cheeses">Cheese</Link>
            <Link to="/wines">Wine</Link>
            {isAdmin ? <Link to="users/all">Users</Link> : null}
            <Link to="/order">
              <i className="bi bi-cart4"></i>
            </Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </ul>
        ) : (
          <ul>
            {/* The navbar will show these links before you log in */}
            <Link to="/">Home</Link>
            <Link to="/cheeses">Cheese</Link>
            <Link to="/wines">Wine</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/order">
              <i className="bi bi-cart4"></i>
            </Link>
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
    userId: state.auth.id,
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapState, mapDispatch)(Navbar);
