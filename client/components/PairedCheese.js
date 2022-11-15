import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getSingleCheeseThunk } from "../store/singleCheese";
import { addNewCheeseOrderThunk } from "../store/order";

const PairedCheese = (props) => {
  useEffect(() => {
    props.getSingleCheeseThunk(props.cheese);
  }, [props.cheese]);

  const handleClick = () => {
    if (props.isLoggedIn) {
      // add a thunk here to add product id and userId
      const userId = props.userId;
      const productId = props.singleCheese.id;
      
      props.addNewCheeseOrderThunk({ userId, productId });
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
console.log('PROPS', props)
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
    userId: state.auth.id
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleCheeseThunk: (cheeseId) =>
      dispatch(getSingleCheeseThunk(cheeseId)),
    addNewCheeseOrderThunk: (orderInfo) => dispatch(addNewCheeseOrderThunk(orderInfo))
  };
};

export default connect(mapState, mapDispatch)(PairedCheese);
