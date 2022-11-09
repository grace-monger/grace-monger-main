import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchSingleWine } from "../store/wines";

const SingleWine = (props) => {
  useEffect(() => {
    props.fetchSingleWine();
  }, []);

  const { wine } = props;
  return (
    <div>
      <h1>Here is one wine:</h1>
      <div className="big-single">
        <h2>{wine.name}</h2>
        <h2>{wine.region}</h2>
        <h2>{wine.year}</h2>
        <h2>{wine.type}</h2>
        <h2>{wine.typeOfGrape}</h2>
        <img width="300px" src={singleWine.imageUrl} />
        <h2>{wine.price}</h2>
        <p>{wine.tastingNotes}</p>
      </div>
      <div>
        <button className="add-to-cart">Add to cart</button>
      </div>
    </div>
  );
};

const mapState = (storeState) => {
  return {
    singleWine: storeState.wine,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleWine: (id) => dispatch(fetchSingleWine(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleWine);
