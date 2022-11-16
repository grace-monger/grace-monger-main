import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchOrder,
  removeWineOrderThunk,
  removeCheeseOrderThunk,
  fulfillOrder,
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
  let total = 0;

  const [wineQuantity, changeWineQuantity] = useState(1);
  const [cheeseQuantity, changeCheeseQuantity] = useState(1);
  const [productQuantity, changeProductQuantity] = useState(1);
  const [renderTotal, setRenderTotal] = useState(0)

  let [cart, setCart] = useState([]);
  let localCart = window.localStorage.getItem("cart");

  const updateQuantityInGuestCart = (productId, amount) => {
    let cartCopy = [...cart];

    let existingItem = cartCopy.find((cartItem) => cartItem.id == productId);

    existingItem.quantity = parseInt(amount);

    setCart(cartCopy);

    let cartString = JSON.stringify(cartCopy);
    localStorage.setItem("cart", cartString);
  };

  useEffect(() => {
    if (props.isLoggedIn) {
      props.fetchOrder(userId);
    } else {
      localCart = JSON.parse(localCart);
      if (localCart) {
        setCart(localCart);
      }
    }
    calculateTotal(order);
    setRenderTotal(total)
  }, [userId, localCart, productQuantity, order.length]);

  if (localCart) {
    orderWinesAndCheeses = JSON.parse(localCart);
  }

  const handleCheeseQuantityChanges = (event) => {
    changeCheeseQuantity(event.target.value);
  };

  const handleWineQuantityChanges = (event) => {
    changeWineQuantity(event.target.value);
  };

  const handleProductQuantityChanges = (event) => {
    changeProductQuantity(event.target.value);
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

  const handleProductQuantityClick = (event) => {
    const productId = parseInt(event.target.value);

    updateQuantityInGuestCart(productId, productQuantity);
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
    const fulfilled = true;
    props.fulfillOrder({ userId, fulfilled });
    window.localStorage.removeItem('cart')
    location.href = "https://grace-monger.onrender.com/checkout";
  };

  const hasOrder = (order) => {
    if (order.length && order[0] && order[0].length) {
      return true;
    } else {
      return false;
    }
  };

  const calculateTotal = (order) => {
    if (props.isLoggedIn) {
      if (hasOrder(order)) {
        let winePricesArray = [];
        let cheesePricesArray = [];
        order[0][0].wines.forEach((element) =>
          winePricesArray.push(parseInt(element.price) * element.Order_Wine.quantity)
        );
        order[1][0].cheeses.forEach((element) =>
          cheesePricesArray.push(parseInt(element.price) * element.Order_Cheese.quantity)
        );
        console.log('WINE', winePricesArray)
        console.log('CHEESE', cheesePricesArray)
        total =
          winePricesArray.reduce((a, b) => a + b) +
          cheesePricesArray.reduce((a, b) => a + b);
      }
    } else {
      let productPricesArray = [];
      localCart.forEach((element) =>
        productPricesArray.push(parseInt(element.price * element.quantity))
      );
      total = productPricesArray.reduce((a, b) => a + b);
    }
  };

  console.log("PROPS", props);
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
                      <p>Price: ${wine.price}</p>
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
                        className="remove-cart"
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
                      <p>Price: ${cheese.price}</p>
                      {/* cheese.Order_Cheese.quantity */}
                      <p> Quantity: {cheese.Order_Cheese.quantity}</p>
                      <button
                        className="quantity"
                        name={order[1][0].id}
                        value={cheese.id}
                        onClick={handleCheeseQuantityClick}
                      >
                        Change Quantity
                      </button>
                      <br></br>
                      <button
                        className="remove-cart"
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
              <div className="ch">
              <div className="subtotal">Subtotal: ${renderTotal}</div>
                <button className="checkout" onClick={checkOut}>
                  CHECKOUT
                </button>
              </div>
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
            <div className='element-list'>
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
                      onChange={handleProductQuantityChanges}
                    />
                    {/* cheese.Order_Cheese.quantity */}
                    <p>Price: ${product.price}</p>
                    <p> Quantity: {product.quantity} </p>
                    <button
                      className="quantity"
                      value={product.id}
                      onClick={handleProductQuantityClick}
                    >
                      Change Quantity
                    </button>
                    <br></br>
                    <button
                      className="remove-cart"
                      value={product.id}
                      onClick={handleProductRemove}
                    >
                      Remove from Cart
                    </button>
                  </article>
                );
              })}
              <div className="ch">
              <div>Subtotal: ${renderTotal}</div>
                <button className="checkout" onClick={checkOut}>
                  CHECKOUT
                </button>
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
    fulfillOrder: (infoToUpdate) => {
      dispatch(fulfillOrder(infoToUpdate));
    },
  };
};

export default connect(mapState, mapDispatch)(Order);
