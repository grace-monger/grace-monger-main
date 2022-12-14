import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";

/**
 * COMPONENT
 */
const LoginForm = (props) => {
  const { name, displayName, error } = props;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const userName = evt.target.userName.value;
    const password = evt.target.password.value;
    props.authenticate(userName, password, formName);
  };
  console.log(props);
  return (
    <div>
      <h3>Log In Here</h3>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="userName">
            <small>Username</small>
          </label>
          <input name="userName" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button className="login" type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    authenticate: (userName, password, formName) =>
      dispatch(authenticate(userName, password, formName)),
  };
};

export const Login = connect(mapLogin, mapDispatch)(LoginForm);
