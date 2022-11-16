import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSingleWine } from "../store/singleWine";
import {
  addNewWineOrderThunk,
  updateWineQuantityThunk,
  fetchOrder,
} from "../store/order";

const PairedWine = (props) => {
  let quantity = 1;
  let newQuantity;
let [cart, setCart] = useState([])
let [showMessage, setShowMessage] = useState(false)

let localCart = localStorage.getItem("cart");

  const addToGuestCart = (item) => {
    let cartCopy = [...cart];
    let { id } = item;
    let existingItem = cartCopy.find((cartItem) => cartItem.id == id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cartCopy.push(item);
    }

    setCart(cartCopy);

    let stringCart = JSON.stringify(cartCopy);
    localStorage.setItem("cart", stringCart);
  };

  useEffect(() => {
    props.fetchSingleWine(props.wine);
    props.fetchOrder(props.userId);
    localCart = JSON.parse(localCart);

    if (localCart) {
      setCart(localCart);
    }
  }, [props.wine, props.userId]);

  const handleClick = () => {
    if (props.isLoggedIn) {
      // add a thunk here to add product id and userId
      const userId = props.userId
      const orderId = props.order[0][0].id;
      const productId = props.match.params.id;
      
      const hasWine = (array) => {
        for (let i = 0; i < array.length; i++) {
          let wine = array[i];
          
          if (wine.id === parseInt(productId)) {
            newQuantity = wine.Order_Wine.quantity + 1
            return true;
          } 
        }
      };

      if (props.order.length > 1) {
        if (hasWine(props.order[0][0].wines)) {
          props.updateWine({ orderId, productId, newQuantity });
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
        price: props.singleWine.price
      });
    }
    setShowMessage(true)
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
              <img src={singleWine.imageUrl} className='product-image' width="350px" />
              <h3>{singleWine.name}</h3>
            </div>
          </Link>
        }
        <button className="add-to-cart" onClick={handleClick}>
          Add to cart
        </button>
        {showMessage && <p>Added To Cart</p>}
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
