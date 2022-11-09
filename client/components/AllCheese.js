import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCheeseThunk } from "../store/cheeses";
import { Link } from "react-router-dom";

const AllCheese = (props) => {
  useEffect(() => {
    props.getCheeseThunk();
  }, []);

  const { cheeses } = props;
  return (
    <div>
      <h1>All Cheeses</h1>
      {cheeses.map((singleCheese) => {
        return (
          <article key={singleCheese.id}>
            <Link key={singleCheese.id} to={`/cheeses/${singleCheese.id}`}>
              <img src={singleCheese.imageUrl} />
              <h2>{singleCheese.name}</h2>
            </Link>
          </article>
        );
      })}
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
