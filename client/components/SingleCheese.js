import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getSingleCheeseThunk } from "../store/singleCheese";

const SingleCheese = (props) => {
  useEffect(() => {
    props.getSingleCheeseThunk(props.match.params.id);
  }, []);

  console.log(props)
  const { singleCheese } = props;
  return (
    <div>
      <h2>{singleCheese.name}</h2>
      <img src={singleCheese.imageUrl} />
      <p> Dairy name: {singleCheese.dairyName}</p>
      <p> Milk type: {singleCheese.milkType}</p>
      <p> Family {singleCheese.family}</p>
      <p> Price: {singleCheese.price}</p>
      <button> Add to cart</button>
    </div>
  );
};

const mapState = (state) => {
  return {
    singleCheese: state.singleCheese,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleCheeseThunk: (id) => dispatch(getSingleCheeseThunk(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleCheese);
