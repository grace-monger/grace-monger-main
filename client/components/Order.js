import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchOrder,
  removeWineOrderThunk,
  removeCheeseOrderThunk,
} from "../store/order";
// import {updateCheeseQuantityThunk} from "../store/order"

/**
 * COMPONENT
 */
const Order = (props) => {
  const userId = props.userId;
  const { order } = props;

  useEffect(() => {
    props.fetchOrder(userId);
  }, [userId]);

  // const [cheeseQuantity, changeCheeseQuantity] = useState(1)

  // const handleCheeseQuantityChanges = (event) => {
  //   changeCheeseQuantity(event.target.value)
  // }

  // const handleCheeseQuantityClick = (event) => {
  //   const orderId = parseInt(event.target.name)
  //   const productId = parseInt(event.target.value)
  //   const quantity = parseInt(cheeseQuantity)
  //   props.updateCheese({orderId, productId, quantity})
  // }

  const handleWineRemove = (event) => {
    const orderId = parseInt(event.target.name);
    const productId = parseInt(event.target.value);
    const id = `${orderId}-${productId}`;
    props.removeWineOrderThunk(id);
  };

  const handleCheeseRemove = (event) => {
    const orderId = parseInt(event.target.name);
    const productId = parseInt(event.target.value);
    const id = `${orderId}-${productId}`;
    props.removeCheeseOrderThunk(id);
  };

  const hasOrder = (order) => {
    if (order.length) {
      return true;
    } else {
      return false;
    }
  };
  // const orderWines = order[0].wines
  //WE WILL NEED TO CONSIDER HOW TO HANDLE MAPPING OF WINE AND CHEESE ORDERS
  //SHOULD EACH ITEM LINK TO ITS SINGLEPAGE?
  return (
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
                  {/* <input
                    type="number"
                    min="0"
                    step="1"
                    className="quantity-incrementor"
                    placeholder="Change quantity"
                    onChange={handleCheeseQuantityChanges}
                  />
                  <button
                    name={order[1][0].id}
                    value={cheese.id}
                    onClick={handleCheeseQuantityClick}
                  >
                    Change Quantity
                  </button> */}
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
        </div>
      ) : (
        <div>
          <h3>Your Cart is Empty!</h3>
          <h6>Please view our products and add to your cart.</h6>
        </div>
      )}
      <div>
        <button
          className="clear-cart"
          onClick={() => props.clearOrder(order[0][0].id)}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

const mapState = (storeState) => {
  return {
    userId: storeState.auth.id,
    order: storeState.order,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchOrder: (userId) => dispatch(fetchOrder(userId)),
    removeWineOrderThunk: (id) => dispatch(removeWineOrderThunk(id)),
    removeCheeseOrderThunk: (id) => dispatch(removeCheeseOrderThunk(id)),
    // updateCheese: (infoToUpdate) => {
    //   dispatch(updateCheeseQuantityThunk(infoToUpdate));
    // },
  };
};

export default connect(mapState, mapDispatch)(Order);
