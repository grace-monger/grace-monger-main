import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCheeseThunk, deleteCheeseThunk } from "../store/cheeses";
import AddCheeseForm from "../components/CreateCheese";
import { Link } from "react-router-dom";

const AllCheese = (props) => {
  useEffect(() => {
    props.getCheeseThunk();
  }, []);

  const { cheeses } = props;

  return (
    <div>
      <h2>Cheeses</h2>
      <div className="element-list">
        {cheeses.map((singleCheese) => {
          return (
            <article key={singleCheese.id} className="single-element">
              <Link key={singleCheese.id} to={`/cheeses/${singleCheese.id}`}>
                <img
                  className="product-image"
                  width="150px"
                  src={singleCheese.imageUrl}
                />
                <h2>{singleCheese.name}</h2>
              </Link>
              {props.isAdmin ? (
                <button
                  className="remove"
                  name={singleCheese.id}
                  onClick={(event) => {
                    props.deleteCheeseThunk(event.target.name);
                  }}
                >
                  Remove
                </button>
              ) : (
                <h1></h1>
              )}
            </article>
          );
        })}
      </div>
      {props.isAdmin ? <AddCheeseForm /> : <h1></h1>}
    </div>
  );
};

const mapState = (state) => {
  return {
    cheeses: state.cheeses,
    isAdmin: state.auth.isAdmin
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCheeseThunk: () => {
      dispatch(getCheeseThunk());
    },
    deleteCheeseThunk: (cheeseId) => {
      dispatch(deleteCheeseThunk(cheeseId));
    },
  };
};

export default connect(mapState, mapDispatch)(AllCheese);
