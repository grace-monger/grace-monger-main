import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchWinePair, fetchSingleWine } from "../store/singleWine";
import { me } from "../store";
import { addNewWineOrderThunk } from "../store/order";
import EditWine from "./EditWine";
import PairedCheese from "./PairedCheese";

const SingleWine = (props) => {
  let [cart, setCart] = useState([]);
  let [quantity, setQuantity] = useState("");

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
    localCart = JSON.parse(localCart);

    if (localCart) {
      setCart(localCart);
    }
  }, []);

  const handleClick = (event) => {
    if (props.isLoggedIn) {
      // add a thunk here to add product id and userId
      const userId = props.userId;
      const productId = props.match.params.id;
      props.addNewWineOrderThunk({ userId, productId });
    } else {
      addToGuestCart({
        id: props.singleWine.id,
        name: props.singleWine.name,
        imageUrl: props.singleWine.imageUrl,
        type: 'wine',
        quantity: parseInt(quantity),
      });
    }
  };

  // const handleChange = (event) => {
  //   if (event.target.className === "quantity-incrementor") {
  //     setQuantity(event.target.value);
  //   }
  // };

  const { singleWine } = props;
  const cheese = singleWine.cheeseId
  
  return (
    <div>
      <div className="big-single">
        <img
          className="product-image"
          width="300px"
          src={singleWine.imageUrl}
        />
        <h2>Wine name:{singleWine.name}</h2>
        <h2>Region: {singleWine.region}</h2>
        <h2>Year:{singleWine.year}</h2>
        <h2>Type: {singleWine.type}</h2>
        <h2>Type of grape:{singleWine.typeOfGrape}</h2>
        <h2>{singleWine.price}</h2>
        <p>{singleWine.tastingNotes}</p>
        <div>
          {/* <input
            type="number"
            min="0"
            step="1"
            className="quantity-incrementor"
            onChange={handleChange}
          /> */}
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
      <PairedCheese cheese={cheese}/>
    </div>
  );
};

const mapState = (state) => {
  return {
    singleWine: state.singleWineReducer,
    userId: state.auth.id,
    isAdmin: state.auth.isAdmin,
    isLoggedIn: !!state.auth.id,
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
