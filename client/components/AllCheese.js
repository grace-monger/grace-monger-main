import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCheeseThunk, deleteCheeseThunk } from "../store/cheeses";
import AddCheeseForm from "../components/CreateCheese";
import { Link } from "react-router-dom";

const AllCheese = (props) => {
  useEffect(() => {
    props.getCheeseThunk();
  }, []);

  console.log("props in all cheese", props);
  const { cheeses } = props;

  return (
    <div>
      <h1>All Cheeses</h1>
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
              {props.authInfo == "admin" ? (
                <button
                  className="remove"
                  name={singleCheese.id}
                  onClick={(event) => {
                    props.deleteCheeseThunk(event.target.name);
                  }}
                >
                  Delete Cheese
                </button>
              ) : (
                <h1></h1>
              )}
            </article>
          );
        })}
      </div>
      {props.authInfo == "admin" ? <AddCheeseForm /> : <h1></h1>}
    </div>
  );
};

const mapState = (state) => {
  return {
    cheeses: state.cheeses,
    authInfo: state.auth.userType,
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
