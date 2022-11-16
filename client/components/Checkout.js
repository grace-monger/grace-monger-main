import React from "react";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
export const Checkout = (props) => {
  const { userName } = props;

  return (
    <div>
      <img className='thank-you' src='thankyou.png' height='200px' width='200px'></img>
      {userName ? (
        <div>
          <h3>Thanks for your purchase, {userName}!</h3>
          <h4>Your order has been confirmed.</h4>
        </div>
      ) : (
        <div>
          <h3>Thanks for your purchase!</h3>
          <h4>Your order has been confirmed.</h4>
        </div>
      )}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    userName: state.auth.userName,
  };
};

export default connect(mapState)(Checkout);
