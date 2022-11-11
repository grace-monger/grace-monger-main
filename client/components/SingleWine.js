import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchWinePair, fetchSingleWine } from "../store/singleWine";
import { me } from "../store";
import { addNewWineOrderThunk } from "../store/order";

const SingleWine = (props) => {
  useEffect(() => {
    props.fetchSingleWine(props.match.params.id);
  }, []);

  console.log("props in singleWine", props);
  const handleClick = (event) => {
    // add a thunk here to add product id and userId
    const userId = props.userId;
    const productId = props.match.params.id;
    props.addNewWineOrderThunk({ userId, productId });
  };

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
        <img width="300px" src={wine.imageUrl} />
        <h2>{wine.price}</h2>
        <p>{wine.tastingNotes}</p>
      </div>
      <div>
        <input
          type="number"
          min="0"
          step="1"
          className="quantity-incrementor"
        />
        <button className="add-to-cart" onClick={handleClick}>
          Add to cart
        </button>
      </div>

      {/* <h2>Pairs well with:</h2>
      <div>
        <h2>{winePair.name}</h2>
        <img width="300px" src={winePair.imageUrl} />
      </div> */}
    </div>
  );
};

const mapState = (storeState) => {
  return {
    wine: storeState.singleWineReducer,
    userId: storeState.auth.id,
    // winePair: storeState.cheese,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleWine: (id) => dispatch(fetchSingleWine(id)),
    addNewWineOrderThunk: (orderInfo) =>
      dispatch(addNewWineOrderThunk(orderInfo)),
    // fetchWinePair: (id) => dispatch(fetchWinePair(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleWine);
