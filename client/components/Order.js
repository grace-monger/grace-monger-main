import React, { useEffect } from "react";
import { connect } from "react-redux";
// import { Link } from 'react-router-dom';
import { fetchOrder } from "../store/order";
import wineData from "../../script/wineData";
// import { me } from "../store";

/**
 * COMPONENT
 */
const Order = (props) => {
  console.log("HERE ARE PROPS IN ORDER", props);
  const userId = props.userId;
  console.log("USERID", userId);

  useEffect(() => {
    props.fetchOrder(userId);
  }, [userId]);

  const { order } = props;
  console.log("ORDER", order);

  const hasOrder = (order) => {
    if (order.length) {
      console.log("ORDER WINES", order[0].wines);
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
          <h2>this is your cart</h2>
          <div className="element-list">
            {order[0].wines.map((wine) => {
              return (
                <article key={wine.id} className="single-element">
                  <img
                    className="product-img"
                    width="150px"
                    src={wine.imageUrl}
                  />
                  <h2>{wine.name}</h2>
                </article>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <h3>No items in cart</h3>
        </div>
      )}
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
  };
};

export default connect(mapState, mapDispatch)(Order);
