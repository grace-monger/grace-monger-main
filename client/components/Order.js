import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrder, clearOrder } from "../store/order";

/**
 * COMPONENT
 */
const Order = (props) => {
  const userId = props.userId;

  useEffect(() => {
    props.fetchOrder(userId);
  }, [userId]);

  const { order } = props;

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
                  <button>Remove from Cart</button>
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
                  <button>Remove from Cart</button>
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
    clearOrder: (id) => dispatch(clearOrder(id)),
  };
};

export default connect(mapState, mapDispatch)(Order);
