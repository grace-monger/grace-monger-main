import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSingleWine } from "../store/singleWine";
import {
  addNewWineOrderThunk,
  updateWineQuantityThunk,
  fetchOrder,
} from "../store/order";

const PairedWine = (props) => {
  let quantity;

  useEffect(() => {
    props.fetchSingleWine(props.wine);
    props.fetchOrder(props.userId);
  }, [props.wine, props.userId]);

  const handleClick = () => {
    if (props.isLoggedIn) {
      // add a thunk here to add product id and userId
      const userId = props.userId;
      const orderId = props.order[0][0].id;
      const productId = props.singleWine.id;

      const hasWine = (array) => {
        for (let i = 0; i < array.length; i++) {
          let wine = array[i];

          if (wine.id === parseInt(productId)) {
            quantity = wine.Order_Wine.quantity + 1;
            return true;
          }
        }
      };

      if (props.order.length > 1) {
        if (hasWine(props.order[0][0].wines)) {
          props.updateWine({ orderId, productId, quantity });
        } else {
          props.addNewWineOrderThunk({ userId, productId });
        }
      }
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
    order: state.order,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleWine: (wineId) => dispatch(fetchSingleWine(wineId)),
    addNewWineOrderThunk: (orderInfo) =>
      dispatch(addNewWineOrderThunk(orderInfo)),
    updateWine: (infoToUpdate) =>
      dispatch(updateWineQuantityThunk(infoToUpdate)),
    fetchOrder: (userId) => dispatch(fetchOrder(userId)),
  };
};

export default connect(mapState, mapDispatch)(PairedWine);
