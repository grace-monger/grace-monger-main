import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { getCheeseThunk } from "../store/cheeses";
import { Link } from "react-router-dom";

// show all cheeses
const AllCheese = (props) => {
  useEffect(() => {
    props.getCheese();
  }, []);

  const { cheeses } = props;
  return (
    <div>
      <h1>All Cheeses</h1>
      {cheeses.map((singleCheese) => {
        return (
          <div key={singleCheese.id}>
            <Link key={singleCheese.id} to={`/cheeses/${singleCheese.id}`}>
              <article>
                <img src={singleCheese.imageUrl} />
              </article>
              <h2>{singleCheese.name}</h2>
              <h5>{singleCheese.price}</h5>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

const mapState = (state) => {
  return {
    cheeses: state.cheeseReducer,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCheese: () => {
      dispatch(getCheeseThunk());
    },
  };
};

export default connect(mapState, mapDispatch)(AllCheese);
