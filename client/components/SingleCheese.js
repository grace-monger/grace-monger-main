import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getSingleCheeseThunk } from "../store/singleCheese";
import { me } from "../store";
import { addNewCheeseOrderThunk, updateCheeseQuantityThunk, fetchOrder } from "../store/order";
import EditCheese from "./EditCheese";
import PairedWine from "./PairedWine";

const SingleCheese = (props) => {

  let pairing;
  let newQuantity;
  let [cart, setCart] = useState([]);
  let [quantity, setQuantity] = useState(1)
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
    props.getSingleCheeseThunk(props.match.params.id);
    props.fetchOrder(props.userId)
    localCart = JSON.parse(localCart);

    if (localCart) {
      setCart(localCart);
    }
  }, [props.userId]);
 
  const handleClick = () => {
    if (props.isLoggedIn) {
      // add a thunk here to add product id and userId
      const userId = props.userId;
      const orderId = props.order[1][0].id
      const productId = props.match.params.id;

      const hasCheese = (array) => {
        for (let i = 0; i < array.length; i++) {
          let cheese = array[i];
          
          if (cheese.id === parseInt(productId)) {
            newQuantity = cheese.Order_Cheese.quantity + 1
            return true;
          } 
        }
      };
      
      if (props.order.length > 1) {
        if (hasCheese(props.order[1][0].cheeses)) {
          props.updateCheese({ orderId, productId, newQuantity });
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
        price: props.singleCheese.price
      });
    }
    setShowMessage(true)
  };

  const { singleCheese } = props;
  const wine = singleCheese.wineId;
  
  if (singleCheese.wineId) {
    pairing = <PairedWine wine={wine} />;
  } else {
    pairing = <p>Currently, this cheese has no pairings.</p>;
  }

  return (
    <div>
      <div className="big-single">
        <h2>{singleCheese.name}</h2>
        <img
          className="product-image"
          width="300px"
          src={singleCheese.imageUrl}
        />
        <p> Dairy name: {singleCheese.dairyName}</p>
        <p> Milk type: {singleCheese.milkType}</p>
        <p> Family {singleCheese.family}</p>
        <h3>${singleCheese.price}</h3>
        <p>{singleCheese.description}</p>
        <button className="add-to-cart" onClick={handleClick}>
          Add to cart
        </button>
        {showMessage && <p>Added To Cart</p>}
      </div>
      {props.isAdmin ? (
        <div>
          <h3>Edit This Cheese</h3>
          <EditCheese singleCheese={singleCheese} />
        </div>
      ) : null}
      <div>{pairing}</div>
    </div>
  );
};

const mapState = (state) => {
  return {
    singleCheese: state.singleCheese,
    userId: state.auth.id,
    isAdmin: state.auth.isAdmin,
    isLoggedIn: !!state.auth.id,
    order: state.order
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleCheeseThunk: (id) => dispatch(getSingleCheeseThunk(id)),
    addNewCheeseOrderThunk: (orderInfo) =>
      dispatch(addNewCheeseOrderThunk(orderInfo)),
      updateCheese: (infoToUpdate) => dispatch(updateCheeseQuantityThunk(infoToUpdate)),
      fetchOrder: (userId) => dispatch(fetchOrder(userId))
  };
};

export default connect(mapState, mapDispatch)(SingleCheese);
