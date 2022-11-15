import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSingleWine } from "../store/singleWine";
import { addNewWineOrderThunk } from "../store/order";

const PairedWine = (props) => {
  useEffect(() => {
    props.fetchSingleWine(props.wine);
  }, [props.wine]);

  const handleClick = () => {
    if (props.isLoggedIn) {
      // add a thunk here to add product id and userId
      const userId = props.userId;
      const productId = props.singleWine.id;

      props.addNewWineOrderThunk({ userId, productId });
    } else {
      addToGuestCart({
        id: props.singleWine.id,
        name: props.singleWine.name,
        imageUrl: props.singleWine.imageUrl,
        type: "wine",
        quantity: parseInt(quantity),
      });
    }
  };

  const { singleWine } = props;
  console.log("PROPS", props);
  console.log("SINGLEWINE", singleWine);
  return (
    <div>
      <h3>Wine Pairing</h3>
      <div className="big-single">
        {
          <Link to={`/wines/${singleWine.id}`} key={singleWine.id}>
            <div>
              <img src={singleWine.imageUrl} width="350px" />
              <h3>{singleWine.name}</h3>
            </div>
          </Link>
        }
        <button className="add-to-cart" onClick={handleClick}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    singleWine: state.singleWineReducer,
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleWine: (wineId) => dispatch(fetchSingleWine(wineId)),
    addNewWineOrderThunk: (orderInfo) =>
      dispatch(addNewWineOrderThunk(orderInfo)),
  };
};

export default connect(mapState, mapDispatch)(PairedWine);
