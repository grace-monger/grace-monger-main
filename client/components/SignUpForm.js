import React from "react";
import { connect } from "react-redux";
import { authenticateSignUp } from "../store";

/**
 * COMPONENT
 */
const SignUpForm = (props) => {
  const { name, displayName, error } = props;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const fullName = evt.target.fullName.value;
    const age = evt.target.age.value;
    const userName = evt.target.userName.value;
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    props.authenticateSignUp(
      fullName,
      age,
      userName,
      email,
      password,
      formName
    );
  };

  return (
    <div>
      <h3>Sign Up Here</h3>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="fullName">
            <small>Full Name</small>
          </label>
          <input name="fullName" type="text" />
        </div>
        <div>
          <label htmlFor="age">
            <small>Age</small>
          </label>
          <input name="age" type="text" />
        </div>
        <div>
          <label htmlFor="userName">
            <small>Username</small>
          </label>
          <input name="userName" type="text" />
        </div>
        <div>
          <label htmlFor="email">
            <small>E-mail</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button className="signup" type="submit">{displayName}</button>
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

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    authenticateSignUp: (fullName, age, userName, email, password, formName) =>
      dispatch(
        authenticateSignUp(fullName, age, userName, email, password, formName)
      ),
  };
};

export const Signup = connect(mapSignup, mapDispatch)(SignUpForm);
