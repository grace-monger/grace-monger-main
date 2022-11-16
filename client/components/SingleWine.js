import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchWinePair, fetchSingleWine } from "../store/singleWine";
import { me } from "../store";
import {
  addNewWineOrderThunk,
  updateWineQuantityThunk,
  fetchOrder,
} from "../store/order";
import EditWine from "./EditWine";
import PairedCheese from "./PairedCheese";

const SingleWine = (props) => {
  let pairing;
  let quantity;
  let [cart, setCart] = useState([]);

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
    props.fetchSingleWine(props.match.params.id);
    props.fetchOrder(props.userId);
    localCart = JSON.parse(localCart);

    if (localCart) {
      setCart(localCart);
    }
  }, [props.userId]);

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
            quantity = wine.Order_Wine.quantity + 1
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
  const cheese = singleWine.cheeseId;

  if (singleWine.cheeseId) {
    pairing = <PairedCheese cheese={cheese} />;
  } else {
    pairing = <p>Currently, this wine has no pairings.</p>;
  }
  console.log("props", props);
  return (
    <div>
      <div className="big-single">
        <h2>{singleWine.name}</h2>
        <img
          className="product-image"
          width="300px"
          src={singleWine.imageUrl}
        />
        <p>Region: {singleWine.region}</p>
        <p>Year: {singleWine.year}</p>
        <p>Type: {singleWine.type}</p>
        <p>Type of grape: {singleWine.typeOfGrape}</p>
        <h2>${singleWine.price}</h2>
        <p>{singleWine.tastingNotes}</p>
        <div>
          <button className="add-to-cart" onClick={handleClick}>
            Add to cart
          </button>
        </div>
        {props.isAdmin ? (
          <div>
            <h3>Edit This Wine</h3>
            <EditWine singleWine={singleWine} />
          </div>
        ) : (
          <h1></h1>
        )}
      </div>
      {pairing}
    </div>
  );
};

const mapState = (state) => {
  return {
    singleWine: state.singleWineReducer,
    userId: state.auth.id,
    isAdmin: state.auth.isAdmin,
    isLoggedIn: !!state.auth.id,
    order: state.order,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleWine: (id) => dispatch(fetchSingleWine(id)),
    addNewWineOrderThunk: (orderInfo) =>
      dispatch(addNewWineOrderThunk(orderInfo)),
    updateWine: (infoToUpdate) =>
      dispatch(updateWineQuantityThunk(infoToUpdate)),
    fetchOrder: (userId) => dispatch(fetchOrder(userId)),
  };
};

export default connect(mapState, mapDispatch)(SingleWine);
