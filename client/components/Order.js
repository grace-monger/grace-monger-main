import React from "react";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
const Order = () => {
  return (
    <div>
      <h3>This is your Order</h3>
      <div className="element-list">
        {orders.map((singleOrder) => {
          return (
            <article key={singleOrder.id} className="single-element">
              <h2>{orders.name}</h2>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Order;
