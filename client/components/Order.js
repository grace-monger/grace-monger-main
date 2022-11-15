import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchOrder,
  removeWineOrderThunk,
  removeCheeseOrderThunk,
} from "../store/order";
import Checkout from "./Checkout";
import {
  updateCheeseQuantityThunk,
  updateWineQuantityThunk,
} from "../store/order";

/**
 * COMPONENT
 */
const Order = (props) => {
  const userId = props.userId;
  const { order } = props;
  let orderWinesAndCheeses;
  let cheeseTotal = 0
  let wineTotal = 0

  const [wineQuantity, changeWineQuantity] = useState(1);
  const [cheeseQuantity, changeCheeseQuantity] = useState(1);

  let [cart, setCart] = useState([]);
  let localCart = window.localStorage.getItem("cart");

  useEffect(() => {
    if (props.isLoggedIn) {
      props.fetchOrder(userId);
    } else {
      localCart = JSON.parse(localCart);
      if (localCart) {
        setCart(localCart);
      }
    }
  }, [userId, localCart]);

  if (localCart) {
    orderWinesAndCheeses = JSON.parse(localCart);
  }

  const handleCheeseQuantityChanges = (event) => {
    changeCheeseQuantity(event.target.value);
  };

  const handleWineQuantityChanges = (event) => {
    changeWineQuantity(event.target.value);
  };

  const handleCheeseQuantityClick = (event) => {
    const orderId = parseInt(event.target.name);
    const productId = parseInt(event.target.value);
    const quantity = parseInt(cheeseQuantity);
    props.updateCheese({ orderId, productId, quantity });
    window.location.reload();
  };

  const handleWineQuantityClick = (event) => {
    const orderId = parseInt(event.target.name);
    const productId = parseInt(event.target.value);
    const quantity = parseInt(wineQuantity);
    props.updateWine({ orderId, productId, quantity });
    window.location.reload();
  };

  const handleWineRemove = (event) => {
    const orderId = parseInt(event.target.name);
    const productId = parseInt(event.target.value);
    const id = `${orderId}-${productId}`;
    props.removeWineOrderThunk(id);
    window.location.reload();
  };

  const handleCheeseRemove = (event) => {
    const orderId = parseInt(event.target.name);
    const productId = parseInt(event.target.value);
    const id = `${orderId}-${productId}`;
    props.removeCheeseOrderThunk(id);
    window.location.reload();
  };

  const handleProductRemove = (event) => {
    const productId = parseInt(event.target.value);
    let cartCopy = [...cart];

    cartCopy = cartCopy.filter((product) => product.id != productId);
    setCart(cartCopy);

    let cartString = JSON.stringify(cartCopy);
    localStorage.setItem("cart", cartString);
  };

  const checkOut = () => {
    location.href = "https://grace-monger.onrender.com/checkout";
  };

  const hasOrder = (order) => {
    if (order.length) {
      return true;
    } else {
      return false;
    }
  };


  //WE WILL NEED TO CONSIDER HOW TO HANDLE MAPPING OF WINE AND CHEESE ORDERS
  //SHOULD EACH ITEM LINK TO ITS SINGLEPAGE?
  return (
    <div>
      {props.isLoggedIn ? (
        <div>
          {hasOrder(order) ? (
            <div>
              <h2>Your Cart</h2>
              <div className="element-list">
                {order[0][0].wines.map((wine) => {
                  wineTotal += parseInt(wine.price)
                  return (
                    <article key={wine.id} className="single-element">
                      <Link key={wine.id} to={`/wines/${wine.id}`}>
                        <img
                          className="product-img"
                          width="150px"
                          src={wine.imageUrl}
                        />
                        <h2>{wine.name}</h2>
                      </Link>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        className="quantity-incrementor"
                        placeholder="Change quantity"
                        onChange={handleWineQuantityChanges}
                        />
                      <p>${wine.price}</p>
                      <p> Quantity: {wine.Order_Wine.quantity}</p>
                      <button
                        className="quantity"
                        name={order[0][0].id}
                        value={wine.id}
                        onClick={handleWineQuantityClick}
                      >
                        Change Quantity
                      </button>
                      <button
                        name={order[0][0].id}
                        value={wine.id}
                        onClick={handleWineRemove}
                      >
                        Remove from Cart
                      </button>
                    </article>
                  );
                })}
              </div>
              <div className="element-list">
                {order[1][0].cheeses.map((cheese) => {
                  //props.order[1][0].cheeses[0].Order_Cheese
                  cheeseTotal += parseInt(cheese.price)
                  return (
                    <article key={cheese.id} className="single-element">
                      <Link key={cheese.id} to={`/cheeses/${cheese.id}`}>
                        <img
                          className="product-img"
                          width="150px"
                          src={cheese.imageUrl}
                          />
                        <h2>{cheese.name}</h2>
                      </Link>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        className="quantity-incrementor"
                        placeholder="Change quantity"
                        onChange={handleCheeseQuantityChanges}
                        />
                        <p>${cheese.price}</p>
                      {/* cheese.Order_Cheese.quantity */}
                      <p> Quantity: {cheese.Order_Cheese.quantity}</p>
                      <button className="quantity"
                        name={order[1][0].id}
                        value={cheese.id}
                        onClick={handleCheeseQuantityClick}
                      >
                        Change Quantity
                      </button>
                      <br></br>
                      <button
                        name={order[0][0].id}
                        value={cheese.id}
                        onClick={handleCheeseRemove}
                      >
                        Remove from Cart
                      </button>
                    </article>
                  );
                })}
              </div>
              <div>
                <button className="checkout" onClick={checkOut}>
                  CHECKOUT
                </button>
              </div>
              <div className="subtotal">Subtotal:$ {cheeseTotal + wineTotal}</div>
            </div>
          ) : (
            <div>
              <h3>Your Cart is Empty!</h3>
              <h6>Please view our products and add to your cart.</h6>
            </div>
          )}
        </div>
      ) : (
        <div>
          {orderWinesAndCheeses.length ? (
            <div>
              {orderWinesAndCheeses.map((product) => {
                return (
                  <article key={product.id} className="single-element">
                    <Link
                      key={product.id}
                      to={`/${product.type}s/${product.id}`}
                    >
                      <img
                        className="product-img"
                        width="150px"
                        src={product.imageUrl}
                      />
                      <h2>{product.name}</h2>
                    </Link>
                    <input
                        type="number"
                        min="0"
                        step="1"
                        className="quantity-incrementor"
                        placeholder="Change quantity"
                        />
                      {/* cheese.Order_Cheese.quantity */}
                      <p> Quantity: </p>
                      <button className="quantity"
                      >
                        Change Quantity
                      </button>
                      <br></br>
                      <button
                      >
                        Remove from Cart
                      </button>
                    <button >
                      Remove from Cart
                    </button>
                  </article>
                );
              })}
              <div>
                <button className="checkout" onClick={checkOut}>
                  CHECKOUT
                </button>
                <div>Subtotal:</div>
              </div>
            </div>
          ) : (
            <div>
              <h3>Your Cart is Empty!</h3>
              <h6>Please view our products and add to your cart.</h6>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const mapState = (storeState) => {
  return {
    userId: storeState.auth.id,
    order: storeState.order,
    isLoggedIn: !!storeState.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchOrder: (userId) => dispatch(fetchOrder(userId)),
    removeWineOrderThunk: (id) => dispatch(removeWineOrderThunk(id)),
    removeCheeseOrderThunk: (id) => dispatch(removeCheeseOrderThunk(id)),
    updateCheese: (infoToUpdate) => {
      dispatch(updateCheeseQuantityThunk(infoToUpdate));
    },
    updateWine: (infoToUpdate) => {
      dispatch(updateWineQuantityThunk(infoToUpdate));
    },
  };
};

export default connect(mapState, mapDispatch)(Order);
