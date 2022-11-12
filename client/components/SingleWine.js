import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchWinePair, fetchSingleWine } from "../store/singleWine";
import { me } from "../store";
import { addNewWineOrderThunk } from "../store/order";
import EditWine from "./EditWine";

const SingleWine = (props) => {
  useEffect(() => {
    props.fetchSingleWine(props.match.params.id);
  }, []);

  const handleClick = (event) => {
    // add a thunk here to add product id and userId
    const userId = props.userId;
    const productId = props.match.params.id;
    props.addNewWineOrderThunk({ userId, productId });
  };

  const { singleWine } = props;

  return (
    <div>
      <h1>Here is one wine:</h1>
      <div className="big-single">
        <h2>{singleWine.name}</h2>
        <h2>{singleWine.region}</h2>
        <h2>{singleWine.year}</h2>
        <h2>{singleWine.type}</h2>
        <h2>{singleWine.typeOfGrape}</h2>
        <img
          className="product-image"
          width="300px"
          src={singleWine.imageUrl}
        />
        <h2>{singleWine.price}</h2>
        <p>{singleWine.tastingNotes}</p>
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
      <h3>Edit This Wine</h3>
      <EditWine singleWine={singleWine} />
    </div>
  );
};

const mapState = (state) => {
  return {
    singleWine: state.singleWineReducer,
    userId: state.auth.id,
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
