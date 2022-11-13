import React from "react";
import { connect } from "react-redux";
import Carousel from "./Carousel";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { userName } = props;

  return (
    <div>
      <h3>Welcome {userName}</h3>
      <Carousel />
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

export default connect(mapState)(Home);
