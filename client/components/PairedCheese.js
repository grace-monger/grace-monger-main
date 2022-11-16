import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getSingleCheeseThunk } from "../store/singleCheese";
import {
  addNewCheeseOrderThunk,
  updateCheeseQuantityThunk,
  fetchOrder,
} from "../store/order";

const PairedCheese = (props) => {
  let quantity;

  useEffect(() => {
    props.getSingleCheeseThunk(props.cheese);
    props.fetchOrder(props.userId);
  }, [props.cheese, props.userId]);

  const handleClick = () => {
    if (props.isLoggedIn) {
      // add a thunk here to add product id and userId
      const userId = props.userId;
      const orderId = props.order[1][0].id;
      const productId = props.singleCheese.id;

      const hasCheese = (array) => {
        for (let i = 0; i < array.length; i++) {
          let cheese = array[i];

          if (cheese.id === parseInt(productId)) {
            quantity = cheese.Order_Cheese.quantity + 1;
            return true;
          }
        }
      };

      if (props.order.length > 1) {
        if (hasCheese(props.order[1][0].cheeses)) {
          props.updateCheese({ orderId, productId, quantity });
        } else {
          props.addNewCheeseOrderThunk({ userId, productId });
        }
      }
    } else {
      addToGuestCart({
        id: props.singleCheese.id,
        name: props.singleCheese.name,
        imageUrl: props.singleCheese.imageUrl,
        type: "cheese",
        quantity: parseInt(quantity),
      });
    }
  };

  const { singleCheese } = props;
  
  return (
    <div>
      <h3>Cheese Pairing</h3>
      <div className="big-single">
        {
          <Link to={`/cheeses/${singleCheese.id}`} key={singleCheese.id}>
            <div>
              <img src={singleCheese.imageUrl} width="350px" />
              <h3>{singleCheese.name}</h3>
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
    singleCheese: state.singleCheese,
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
    order: state.order,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleCheeseThunk: (cheeseId) =>
      dispatch(getSingleCheeseThunk(cheeseId)),
    addNewCheeseOrderThunk: (orderInfo) =>
      dispatch(addNewCheeseOrderThunk(orderInfo)),
    updateCheese: (infoToUpdate) =>
      dispatch(updateCheeseQuantityThunk(infoToUpdate)),
    fetchOrder: (userId) => dispatch(fetchOrder(userId)),
  };
};

export default connect(mapState, mapDispatch)(PairedCheese);
