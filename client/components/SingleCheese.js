import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getSingleCheeseThunk } from "../store/singleCheese";
import { me } from "../store";

const SingleCheese = (props) => {
  useEffect(() => {
    props.getSingleCheeseThunk(props.match.params.id);
  }, []);
console.log(props)
  const { singleCheese } = props;
  return (
    <div>
      <h2>{singleCheese.name}</h2>
      <img width="300px" src={singleCheese.imageUrl} />
      <p> Dairy name: {singleCheese.dairyName}</p>
      <p> Milk type: {singleCheese.milkType}</p>
      <p> Family {singleCheese.family}</p>
      <h3> {singleCheese.price}</h3>
      <p>{singleCheese.description}</p>
      <input
          type="number"
          min="0"
          step="1"
          className="quantity-incrementor"
        />
      <button className="add-to-cart"> Add to cart</button>
    </div>
  );
};

const mapState = (state) => {
  return {
    singleCheese: state.singleCheese,
    userId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleCheeseThunk: (id) => dispatch(getSingleCheeseThunk(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleCheese);
