import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCheeseThunk } from "../store/cheeses";
import AddCheeseForm from "../components/CreateCheese"
import { Link } from "react-router-dom";

const AllCheese = (props) => {
  useEffect(() => {
    props.getCheeseThunk();
  }, []);

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
              <button className="remove">
                {/* make thunk to remove a cheese */}
                {/* add handleclick  */}
                Delete Cheese
              </button>
            </article>
          );
        })}
      </div>
      <AddCheeseForm /> 
    </div>
  );
};

const mapState = (state) => {
  return {
    cheeses: state.cheeses,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCheeseThunk: () => {
      dispatch(getCheeseThunk());
    },
  };
};

export default connect(mapState, mapDispatch)(AllCheese);
