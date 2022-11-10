import React from "react";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
const Order = (props) => {
  console.log("HERE ARE PROPS IN ORDER", props);
  return (
    <div>
      <h3>This is your Order</h3>
    </div>
  );
};

const mapState = (storeState) => {
  return {
    userId: storeState.auth.id,
  };
};

export default connect(mapState)(Order);
