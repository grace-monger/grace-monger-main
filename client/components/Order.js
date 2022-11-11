import React, { useEffect } from "react";
import { connect } from "react-redux";
// import { Link } from 'react-router-dom';
import { fetchOrder } from "../store/order";
import { me } from "../store";

/**
 * COMPONENT
 */
const Order = (props) => {
  console.log("HERE ARE PROPS IN ORDER", props);
  useEffect(() => {
    props.fetchOrder(props.userId);
  }, []);

  const { order } = props;
  console.log(order);
  //WE WILL NEED TO CONSIDER HOW TO HANDLE MAPPING OF WINE AND CHEESE ORDERS
  //SHOULD EACH ITEM LINK TO ITS SINGLEPAGE?
  return (
    <div>
      <h3>This is your Order</h3>
      {/* <div>
        {order.map((item) => {
          return (
            <article key={order.id} className="single-element">
                <img
                  className="product-img"
                  width="150px"
                  src={order.imageUrl}
                />
                <h2>{order.name}</h2>
            </article>
          );
        })}
      </div>  */}
    </div>
  );
};

const mapState = (storeState) => {
  return {
    userId: storeState.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchOrder: (userId) => dispatch(fetchOrder(userId)),
  };
};

export default connect(mapState, mapDispatch)(Order);
